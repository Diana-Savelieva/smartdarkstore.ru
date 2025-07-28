import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Route, Users, Video, Zap, BarChart3, Package, Check, TrendingUp, Smartphone, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Form submit handler called! preventDefault() executed");

    // Дополнительная защита: если URL содержит mailto, блокируем отправку
    if (window.location.href.includes('mailto:')) {
      console.error("DETECTED MAILTO IN URL - BLOCKING");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company') || 'Не указана',
      position: formData.get('position') || 'Не указана',
      message: formData.get('message') || 'Не указано',
    };

    console.log("Sending data via Supabase:", data);

    try {
      const response = await fetch('https://mlmxbnjftdifeyjanyrz.supabase.co/functions/v1/dynamic-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log("Supabase response status:", response.status);

      if (!response.ok) throw new Error('Ошибка отправки');

      toast({
        title: "Заявка отправлена!",
        description: "Мы получили вашу заявку и свяжемся с вами в ближайшее время.",
      });

      e.currentTarget.reset();

    } catch (error) {
      console.error("Supabase error:", error);
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте еще раз или свяжитесь с нами по телефону.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      console.log("Form submit process finished");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ... остальная часть страницы ... */}

      <section id="contact-form" className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">Оставьте заявку</h2>
              <p className="text-lg md:text-xl text-gray-600">
                Задайте вопрос о нашем продукте и решениях или пришлите информацию о вашем проекте.
              </p>
            </div>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              action="javascript:void(0)"
              method="post"
              data-no-mailto="true"
              data-form="contact-v3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Имя *</label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ваше имя"
                    className="border-gray-300 h-10 md:h-12"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="email@company.com"
                    type="email"
                    className="border-gray-300 h-10 md:h-12"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+7 (999) 123-45-67"
                    className="border-gray-300 h-10 md:h-12"
                    required
                    type="tel"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Компания</label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Название компании"
                    className="border-gray-300 h-10 md:h-12"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">Должность</label>
                <Input
                  id="position"
                  name="position"
                  placeholder="Ваша должность"
                  className="border-gray-300 h-10 md:h-12"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Расскажите о ваших потребностях и задачах..."
                  className="border-gray-300 min-h-[100px] md:min-h-[120px]"
                />
              </div>
              <p className="text-xs md:text-sm text-gray-500 mb-4">
                Нажимая на кнопку, вы даете согласие на обработку своих персональных данных
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full py-3 text-base md:text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* ... остальная часть страницы ... */}
    </div>
  );
};

export default Index;

