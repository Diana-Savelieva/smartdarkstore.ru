
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const formData: ContactFormData = await req.json();
    
    console.log('Received form data:', formData);

    // Валидация обязательных полей
    if (!formData.name || !formData.email || !formData.phone) {
      return new Response(
        JSON.stringify({ 
          error: 'Заполните обязательные поля: имя, email, телефон' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
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

    // Отправка email через SMTP
    const emailData = {
      to: Deno.env.get('TO_EMAIL') || 'info@navigine.com',
      from: Deno.env.get('FROM_EMAIL') || 'client@navigine.com',
      subject: Deno.env.get('EMAIL_SUBJECT') || 'Новая заявка Смарт даркстор',
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    };

    // Проверяем SendGrid API ключ
    const sendgridKey = Deno.env.get('SENDGRID_API_KEY');
    
    if (sendgridKey) {
      console.log('Using SendGrid for email sending');
      const smtpResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sendgridKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: emailData.to }]
          }],
          from: { email: emailData.from },
          subject: emailData.subject,
          content: [{
            type: 'text/html',
            value: emailData.html
          }]
        })
      });

      if (!smtpResponse.ok) {
        const errorText = await smtpResponse.text();
        console.error('SendGrid error:', smtpResponse.status, errorText);
        throw new Error(`SendGrid error: ${smtpResponse.status} - ${errorText}`);
      }
    } else {
      // Используем SMTP настройки
      console.log('Using SMTP for email sending');
      
      const smtpHost = Deno.env.get('SMTP_HOST');
      const smtpPort = Deno.env.get('SMTP_PORT');
      const smtpUser = Deno.env.get('SMTP_USER');
      const smtpPass = Deno.env.get('SMTP_PASS');

      console.log('SMTP settings check:', {
        host: smtpHost ? 'set' : 'not set',
        port: smtpPort ? 'set' : 'not set',
        user: smtpUser ? 'set' : 'not set',
        pass: smtpPass ? 'set' : 'not set'
      });

      if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
        console.error('Missing SMTP settings:', {
          SMTP_HOST: smtpHost ? 'OK' : 'MISSING',
          SMTP_PORT: smtpPort ? 'OK' : 'MISSING',
          SMTP_USER: smtpUser ? 'OK' : 'MISSING',
          SMTP_PASS: smtpPass ? 'OK' : 'MISSING'
        });
        throw new Error('SMTP настройки не найдены в переменных окружения. Проверьте секреты Supabase: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS');
      }

      try {
        // Создаем SMTP соединение
        console.log(`Connecting to SMTP server: ${smtpHost}:${smtpPort}`);
        
        const conn = await Deno.connect({
          hostname: smtpHost,
          port: parseInt(smtpPort)
        });

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        async function writeCommand(command: string): Promise<void> {
          console.log('SMTP CMD:', command.replace(smtpPass, '****'));
          await conn.write(encoder.encode(command + '\r\n'));
        }

        async function readResponse(): Promise<string> {
          const buffer = new Uint8Array(1024);
          const n = await conn.read(buffer);
          const response = decoder.decode(buffer.subarray(0, n || 0));
          console.log('SMTP RESP:', response.trim());
          return response;
        }

        try {
          // SMTP протокол
          await readResponse(); // Ждем приветствие сервера
          
          await writeCommand(`EHLO ${smtpHost}`);
          await readResponse();
          
          await writeCommand('AUTH LOGIN');
          await readResponse();
          
          await writeCommand(btoa(smtpUser));
          await readResponse();
          
          await writeCommand(btoa(smtpPass));
          await readResponse();
          
          await writeCommand(`MAIL FROM:<${emailData.from}>`);
          await readResponse();
          
          await writeCommand(`RCPT TO:<${emailData.to}>`);
          await readResponse();
          
          await writeCommand('DATA');
          await readResponse();
          
          const emailMessage = [
            `From: ${emailData.from}`,
            `To: ${emailData.to}`,
            `Subject: ${emailData.subject}`,
            'Content-Type: text/html; charset=utf-8',
            '',
            emailData.html,
            '.'
          ].join('\r\n');
          
          await writeCommand(emailMessage);
          await readResponse();
          
          await writeCommand('QUIT');
          await readResponse();
          
          console.log('Email sent successfully via SMTP');
          
        } catch (smtpError) {
          console.error('SMTP protocol error:', smtpError);
          throw new Error(`SMTP отправка не удалась: ${smtpError.message}`);
        } finally {
          conn.close();
        }
        
      } catch (connectionError) {
        console.error('SMTP connection error:', connectionError);
        throw new Error(`Ошибка подключения к SMTP серверу: ${connectionError.message}`);
      }
    }

    console.log('Email sent successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Заявка успешно отправлена' 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in dynamic-task function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: `Ошибка отправки заявки: ${error.message}` 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
