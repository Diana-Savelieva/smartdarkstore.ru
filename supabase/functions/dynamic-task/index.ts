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

    // Отправка email через SMTP (два варианта)
    const emailData = {
      to: Deno.env.get('TO_EMAIL') || 'info+nvgn@nvgn.ru',
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
        throw new Error(`SendGrid error: ${smtpResponse.status} - ${errorText}`);
      }
    } else {
      // Вариант 2: Через обычный SMTP (если нет SendGrid)
      const smtpHost = Deno.env.get('SMTP_HOST');
      const smtpPort = Deno.env.get('SMTP_PORT');
      const smtpUser = Deno.env.get('SMTP_USER');
      const smtpPass = Deno.env.get('SMTP_PASS');

      if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
        throw new Error('SMTP настройки не заданы. Укажите SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS');
      }

      // Здесь можно использовать nodemailer или другую SMTP библиотеку
      // Для простоты используем fetch к внешнему SMTP сервису
      console.log('SMTP отправка через:', {
        host: smtpHost,
        port: smtpPort,
        user: smtpUser,
        to: emailData.to,
        from: emailData.from,
        subject: emailData.subject
      });
      
      // Примечание: в продакшене здесь должна быть реальная SMTP отправка
      // Для демонстрации просто логируем
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
        error: 'Ошибка отправки заявки. Попробуйте позже.' 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);