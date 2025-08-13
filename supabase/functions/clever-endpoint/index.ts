import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const handler = async (req: Request) => {
  // Обрабатываем preflight OPTIONS запрос
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(JSON.stringify({
        error: 'Expected application/json content-type'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        }
      });
    }

    const formData = await req.json();

    // Проверяем обязательные поля
    if (!formData.name || !formData.email || !formData.phone) {
      return new Response(JSON.stringify({
        error: 'Заполните обязательные поля: имя, email, телефон'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        }
      });
    }

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

    // Настройки для SMTP из переменных окружения
    const smtpHost = Deno.env.get('SMTP_HOST');
    const smtpPort = Deno.env.get('SMTP_PORT');
    const smtpUser = Deno.env.get('SMTP_USER');
    const smtpPass = Deno.env.get('SMTP_PASS');
    const emailTo = Deno.env.get('TO_EMAIL') || 'info@navigine.com';
    const emailFrom = Deno.env.get('FROM_EMAIL') || 'client@navigine.com';
    const emailSubject = Deno.env.get('EMAIL_SUBJECT') || 'Новая заявка Смарт даркстор';

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      throw new Error('SMTP настройки не заданы. Укажите SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS');
    }

    let conn = await Deno.connect({
      hostname: smtpHost,
      port: parseInt(smtpPort),
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
      await writeAndRead('');  // Ждём приветствия
      await writeAndRead(`EHLO ${smtpHost}`);
      const starttlsResponse = await writeAndRead('STARTTLS');
      if (!starttlsResponse.startsWith('220')) {
        throw new Error(`STARTTLS не поддерживается или не выполнен: ${starttlsResponse}`);
      }
      conn = await Deno.startTls(conn, { hostname: smtpHost });
      await writeAndRead(`EHLO ${smtpHost}`);
      await writeAndRead('AUTH LOGIN');
      await writeAndRead(btoa(smtpUser));
      await writeAndRead(btoa(smtpPass));
      await writeAndRead(`MAIL FROM:<${emailFrom}>`);
      await writeAndRead(`RCPT TO:<${emailTo}>`);
      await writeAndRead('DATA');

      const emailMessage = [
        `From: ${emailFrom}`,
        `To: ${emailTo}`,
        `Subject: ${emailSubject}`,
        'Content-Type: text/html; charset=utf-8',
        '',
        emailContent.replace(/\n/g, '<br>'),
        '.'
      ].join('\r\n');

      await writeAndRead(emailMessage);
      await writeAndRead('QUIT');
      conn.close();
    } catch (smtpError) {
      conn.close();
      throw new Error(`SMTP отправка не удалась: ${smtpError.message}`);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Заявка успешно отправлена'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
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
        ...corsHeaders,
      }
    });
  }
};

serve(handler);
