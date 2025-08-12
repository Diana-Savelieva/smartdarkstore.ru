import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

const handler = async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  
  if (req.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: corsHeaders
    });
  }
  
  try {
    // Проверка Content-Type; если хотите, добавьте для защиты
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(JSON.stringify({
        error: 'Expected application/json content-type'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
    
    const formData = await req.json();
    console.log('Received form data:', formData);
    
    // Валидация обязательных полей
    if (!formData.name || !formData.email || !formData.phone) {
      return new Response(JSON.stringify({
        error: 'Заполните обязательные поля: имя, email, телефон'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
    
    // Формирование письма
    const emailContent = `
Новая заявка Смарт даркстор


Имя: ${formData.name}
Email: ${formData.email}
Телефон: ${formData.phone}
Компания: ${formData.company || 'Не указана'}
Должность: ${formData.position || 'Не указана'}


Сообщение:
${formData.message || 'Не указано'}
   `.trim();
    
    // Отправка email через SMTP (два варианта)
    const emailData = {
      to: Deno.env.get('TO_EMAIL') || 'info@navigine.com',
      from: Deno.env.get('FROM_EMAIL') || 'client@navigine.com',
      subject: Deno.env.get('EMAIL_SUBJECT') || 'Новая заявка Смарт даркстор',
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    };
    
    // Вариант 1: Через SendGrid API (если есть API ключ)
    const sendgridKey = Deno.env.get('SENDGRID_API_KEY');
    if (sendgridKey) {
      const smtpResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sendgridKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [
                {
                  email: emailData.to
                }
              ]
            }
          ],
          from: {
            email: emailData.from
          },
          subject: emailData.subject,
          content: [
            {
              type: 'text/html',
              value: emailData.html
            }
          ]
        })
      });
      
      if (!smtpResponse.ok) {
        const errorText = await smtpResponse.text();
        throw new Error(`SendGrid error: ${smtpResponse.status} - ${errorText}`);
      }
    } else {
      // Вариант 2: Через обычный SMTP с поддержкой STARTTLS и TLS (порт 587)
      const smtpHost = Deno.env.get('SMTP_HOST');
      const smtpPort = Deno.env.get('SMTP_PORT');
      const smtpUser = Deno.env.get('SMTP_USER');
      const smtpPass = Deno.env.get('SMTP_PASS');
      
      if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
        throw new Error('SMTP настройки не заданы. Укажите SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS');
      }
      
      let conn = await Deno.connect({
        hostname: smtpHost,
        port: parseInt(smtpPort)
      });
      
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      
      async function writeAndRead(command: string) {
        await conn.write(encoder.encode(command + '\r\n'));
        const buffer = new Uint8Array(1024);
        const n = await conn.read(buffer);
        return decoder.decode(buffer.subarray(0, n || 0));
      }
      
      try {
        // SMTP протокол
        // 1. Ждём приветствие сервера
        await writeAndRead('');
        // 2. Отправляем EHLO (идентификация)
        await writeAndRead(`EHLO ${smtpHost}`);
        // 3. Запрашиваем STARTTLS для перехода на защищённое соединение
        const starttlsResponse = await writeAndRead('STARTTLS');
        if (!starttlsResponse.startsWith('220')) {
          throw new Error(`STARTTLS не поддерживается или не выполнен: ${starttlsResponse}`);
        }
        // 4. Переключаемся на TLS поверх TCP соединения
        conn = await Deno.startTls(conn, {
          hostname: smtpHost
        });
        // 5. Повторно отправляем EHLO уже по защищённому соединению
        await writeAndRead(`EHLO ${smtpHost}`);
        // 6. Начинаем аутентификацию
        await writeAndRead('AUTH LOGIN');
        await writeAndRead(btoa(smtpUser));
        await writeAndRead(btoa(smtpPass));
        // 7. Отправляем MAIL FROM и RCPT TO
        await writeAndRead(`MAIL FROM:<${emailData.from}>`);
        await writeAndRead(`RCPT TO:<${emailData.to}>`);
        // 8. Отправка DATA (тела письма)
        await writeAndRead('DATA');
        const emailMessage = [
          `From: ${emailData.from}`,
          `To: ${emailData.to}`,
          `Subject: ${emailData.subject}`,
          'Content-Type: text/html; charset=utf-8',
          '',
          emailData.html,
          '.'
        ].join('\r\n');
        await writeAndRead(emailMessage);
        // 9. Завершаем SMTP сессию
        await writeAndRead('QUIT');
        conn.close();
      } catch (smtpError) {
        conn.close();
        throw new Error(`SMTP отправка не удалась: ${smtpError.message}`);
      }
    }
    
    console.log('Email sent successfully');
    return new Response(JSON.stringify({
      success: true,
      message: 'Заявка успешно отправлена'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error('Error in clever-endpoint function:', error);
    return new Response(JSON.stringify({
      error: 'Ошибка отправки заявки. Попробуйте позже.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
};

serve(handler);