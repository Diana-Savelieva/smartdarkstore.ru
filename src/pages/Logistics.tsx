import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Warehouse, TrendingUp, Map, BarChart, Zap, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logisticsHero from "@/assets/logistics-hero.png";

const Logistics = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string || 'Не указана',
      position: formData.get('position') as string || 'Не указана',
      message: formData.get('message') as string || 'Не указано'
    };
    
    try {
      const { data: result, error } = await supabase.functions.invoke('clever-endpoint', {
        body: data,
      });
      
      if (error) {
        throw new Error(error.message || 'Ошибка отправки');
      }
      
      toast({
        title: "Спасибо! Ваша заявка отправлена.",
        description: "Мы получили вашу заявку и свяжемся с вами в ближайшее время.",
      });
      form.reset();
    } catch (error: any) {
      console.error('Ошибка отправки формы:', error);
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте еще раз или свяжитесь с нами по телефону.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative py-6 md:py-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center mb-4 md:mb-6 gap-4 lg:gap-8">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/2fbd3ffc-2c98-4dc7-b80a-963941993cce.png" 
                alt="СМАРТ ДАРКСТОР" 
                className="h-12 md:h-16 w-auto"
              />
            </Link>
            
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 bg-transparent text-base px-5 py-2.5">
                    Отрасли
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 p-4 w-[200px] bg-white">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/retail" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium">Ритейл</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/logistics" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium">Логистика и склад</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/faq" className="inline-flex items-center justify-center rounded-md text-base font-medium text-gray-700 hover:text-blue-600 bg-transparent px-5 py-2.5 transition-colors">
                      FAQ
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/news" className="inline-flex items-center justify-center rounded-md text-base font-medium text-gray-700 hover:text-blue-600 bg-transparent px-5 py-2.5 transition-colors">
                      Новости
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/contacts" className="inline-flex items-center justify-center rounded-md text-base font-medium text-gray-700 hover:text-blue-600 bg-transparent px-5 py-2.5 transition-colors">
                      Контакты
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button 
              asChild
              className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white border-0 shadow-lg transition-all duration-500 animate-gradient lg:ml-auto"
            >
              <a 
                href="https://planerka.app/aleksandra-buvasheva-17mrhw/30-minutnyy-zvonok-s-menedzherom-smart-darkstor" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Назначить видеозвонок
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Логистика и склад
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Как Смарт даркстор помогает логистике и складам сокращать время сборки и повышать эффективность
              </p>
            </div>
            <div className="relative">
              <img 
                src={logisticsHero} 
                alt="Логистика и склад" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed">
                Современная логистика переживает серьёзное давление: растущие объёмы онлайн-заказов, высокий уровень конкуренции и кадровый дефицит заставляют бизнес искать новые пути повышения производительности. Каждый лишний метр, пройденный сборщиком, и каждая секунда задержки при поиске товара напрямую влияют на скорость и себестоимость доставки.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                В этих условиях особое значение приобретают решения, которые позволяют не просто автоматизировать склад, а сделать его умным и адаптивным. Одно из таких решений — Смарт даркстор, продукт, который помогает оптимизировать сборочные процессы, сокращать маршруты и повышать эффективность без масштабных инвестиций в роботизацию.
              </p>
            </div>

            {/* Key Problems */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ключевые проблемы логистики и складов сегодня</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Map className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Неоптимальные маршруты сборки</h3>
                  <p className="text-gray-700">
                    Большинство складов по-прежнему формируют маршруты интуитивно или по статичным правилам. Это приводит к лишним движениям, пересечениям сборщиков и потере времени на каждом заказе.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Warehouse className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Нерациональное размещение товаров</h3>
                  <p className="text-gray-700">
                    Популярные SKU часто оказываются далеко от начальных точек сборки, а медленно оборачиваемые позиции занимают удобные зоны. В результате — пробеги, путаница и снижение скорости комплектации.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <BarChart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Ограниченная аналитика и визуализация данных</h3>
                  <p className="text-gray-700">
                    Даже при наличии WMS системы данные остаются фрагментарными: сложно увидеть картину движения сборок в реальном времени и оценить эффективность каждой зоны или сотрудника.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Кадровая нагрузка и человеческий фактор</h3>
                  <p className="text-gray-700">
                    С ростом объёмов растёт нагрузка на сборщиков. Без интеллектуальной поддержки растёт риск ошибок, утомляемость и текучесть персонала.
                  </p>
                </div>
              </div>
            </div>

            {/* How It Solves */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Как Смарт даркстор решает эти задачи</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Смарт даркстор — это API-интеграция, которая подключается к существующим WMS-, OMS- или ERP-системам и предоставляет интеллектуальный слой анализа и рекомендаций.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Платформа не требует замены текущего ПО и работает как «надстройка оптимизации», которая:
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Оптимизирует маршруты сборки</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Система анализирует данные о заказах, расположении стеллажей и исторических маршрутах сборщиков. На основе алгоритмов маршрутизации Смарт даркстор предлагает кратчайшие пути для каждой сборки, минимизируя холостые перемещения и сокращая общее время на заказ.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Рекомендует перестановку товаров</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Платформа отслеживает популярность позиций и динамику заказов. Она предлагает переставить популярные товары ближе к старту сборки, а малозначимые — в дальние зоны. Таким образом склад сам «перестраивается» под реальные паттерны спроса.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Предлагает оптимальную конфигурацию стеллажей и полок</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Смарт даркстор анализирует использование пространства и даёт рекомендации по перестановке стеллажей, улучшая логистику движения внутри склада. Это особенно важно при пиковых нагрузках или запуске новых продуктовых категорий.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Предоставляет прозрачную аналитику</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Тепловые карты, отчёты по эффективности зон, аналитика по времени сборки — всё это помогает менеджерам видеть узкие места и принимать обоснованные решения по оптимизации.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">5. Быстро внедряется и масштабируется</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Благодаря API-архитектуре, интеграция с существующими системами занимает минимальное время. Смарт даркстор легко масштабируется на новые локации и адаптируется под разные форматы — от дарксторов и фулфилмент-центров до региональных распределительных складов.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Better */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-12 rounded-2xl shadow-2xl text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Почему это выгоднее, чем полная автоматизация</h2>
              <p className="text-lg leading-relaxed mb-6">
                Полная роботизация склада — дорогое и долгосрочное решение, требующее месяцев внедрения и миллионов инвестиций. Смарт даркстор предлагает «умную автоматизацию» без капитальных затрат: система повышает эффективность существующих процессов и персонала за счёт точных данных и алгоритмов.
              </p>
              <p className="text-lg leading-relaxed">
                Фактически Смарт даркстор превращает обычный склад в цифровой даркстор, который учится, адаптируется и постоянно повышает производительность.
              </p>
            </div>

            {/* Conclusion */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Итог</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                В эпоху, когда скорость и точность сборки становятся ключевыми конкурентными преимуществами, Смарт даркстор даёт компаниям инструмент для системного роста без масштабных перестроек.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Платформа объединяет данные, аналитику и оптимизацию в одном API-решении, позволяя логистическим операторам, e-commerce-ритейлерам и фулфилмент-центрам работать быстрее, умнее и эффективнее.
              </p>
              <p className="text-xl font-semibold text-blue-600 mt-8">
                Смарт даркстор — это ваш путь от «ручного» склада к интеллектуальной логистике.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
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
              data-form="contact-v3"
              data-no-mailto="true"
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
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Компания</label>
                  <Input 
                    id="company"
                    name="company"
                    placeholder="Название компании" 
                    className="border-gray-300 h-10 md:h-12"
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

      {/* Footer */}
      <footer className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Смарт даркстор</h3>
              <p className="text-base md:text-lg text-white/90 leading-relaxed">
                Инновационный продукт для управления заказами, направленный на повышение эффективности процессов сборки заказов и оптимизацию работы торговых точек.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/90" />
                <span className="text-base md:text-lg text-white/90">+7 (495) 255-3978</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/90" />
                <span className="text-base md:text-lg text-white/90">sasha@smartdarkstore.ru</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Logistics;
