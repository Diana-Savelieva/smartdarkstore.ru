import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, ShoppingCart, TrendingUp, Users, Clock, Route, BarChart } from "lucide-react";
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
import retailHero from "@/assets/retail-hero.png";

const Retail = () => {
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
                Ритейл
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Как Смарт даркстор трансформирует процессы сборки заказов в ритейле и повышает эффективность торговых точек
              </p>
            </div>
            <div className="relative">
              <img 
                src={retailHero} 
                alt="Ритейл" 
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
                Современный ритейл сталкивается с беспрецедентными вызовами: взрывной рост онлайн-продаж, сокращение сроков доставки до 15-30 минут, острая конкуренция и постоянная потребность в оптимизации операционных расходов. Каждая минута, потраченная сборщиком на поиск товара или неэффективное перемещение по торговой точке, напрямую влияет на прибыльность и клиентский опыт.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                В этих условиях традиционные подходы к управлению сборкой заказов становятся узким местом. Смарт даркстор предлагает инновационное решение, которое трансформирует обычные торговые точки, дарксторы и микрофулфилмент-центры в высокоэффективные цифровые операционные пространства.
              </p>
            </div>

            {/* Key Challenges */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Основные вызовы ритейла</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Route className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Длинные и неэффективные маршруты</h3>
                  <p className="text-gray-700">
                    Сборщики тратят до 60-70% времени на перемещения между полками, что критически снижает производительность и увеличивает себестоимость каждого заказа.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Непредсказуемость времени сборки</h3>
                  <p className="text-gray-700">
                    Отсутствие точного прогноза времени выполнения заказов приводит к задержкам, неудовлетворенности клиентов и проблемам с логистикой доставки.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Неравномерная загрузка персонала</h3>
                  <p className="text-gray-700">
                    Пиковые нагрузки приводят к перегрузке одних сборщиков и простою других, что снижает общую эффективность и повышает риск ошибок.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Неоптимальное размещение товаров</h3>
                  <p className="text-gray-700">
                    Популярные товары часто оказываются далеко от стартовых точек сборки, а сезонные изменения спроса не учитываются при планировании выкладки.
                  </p>
                </div>
              </div>
            </div>

            {/* How It Solves */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Как Смарт даркстор решает эти задачи</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Смарт даркстор — это интеллектуальная платформа на базе API, которая интегрируется с существующими системами управления (WMS, OMS, ERP) и создаёт умный слой оптимизации сборочных процессов.
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Умная оптимизация маршрутов</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Система учитывает более 10 параметров: массу товара, объём, зоны хранения (холод, химия), хрупкость и другие характеристики. Алгоритм строит кратчайший маршрут для каждого заказа, сокращая время сборки до 25% и пробег сборщиков до 70%.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Персонализация под опыт сотрудников</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Платформа анализирует стиль работы каждого сборщика и формирует индивидуальные маршруты. Новички получают простые маршруты с подробными указаниями, опытные сотрудники — оптимизированные под их навыки.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">3. AI-ассистент менеджера</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Интеллектуальный помощник отвечает на вопросы сотрудников, помогает быстро находить информацию о перемещении стеллажей и товаров, обучает новичков и сопровождает на каждом этапе работы.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Динамические рекомендации по выкладке</h3>
                  <p className="text-gray-700 leading-relaxed">
                    На основе тепловых карт популярности система предлагает оптимальное размещение товаров: популярные SKU перемещаются ближе к стартовым точкам, учитывается товарное соседство и сезонность спроса.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">5. Точное прогнозирование времени</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Клиенты получают реальное время готовности заказа с точностью до минуты. Это повышает удовлетворённость, снижает количество звонков в поддержку и оптимизирует работу курьерской службы.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">6. Комплексная аналитика</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Менеджеры получают детальные отчёты по эффективности зон, производительности сотрудников, тепловые карты движения и рекомендации по улучшению процессов.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-12 rounded-2xl shadow-2xl text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Преимущества для ритейл-бизнеса</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Рост производительности до 25%</h4>
                    <p className="text-white/90">Сокращение времени на каждый заказ позволяет обрабатывать больше заказов без увеличения штата</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Route className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Сокращение маршрутов до 70%</h4>
                    <p className="text-white/90">Минимизация холостых перемещений напрямую снижает усталость персонала и операционные расходы</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <BarChart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Точность сборки 99%+</h4>
                    <p className="text-white/90">Навигация и контроль на каждом этапе практически исключают ошибки при комплектации</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Снижение текучести кадров</h4>
                    <p className="text-white/90">Комфортные условия работы и справедливое распределение нагрузки повышают лояльность персонала</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Integration */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Простая интеграция и масштабирование</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Смарт даркстор работает как API-надстройка над существующими системами. Не требуется замена текущего ПО или дорогостоящая роботизация. Внедрение занимает минимальное время, а платформа легко масштабируется на новые локации — от небольших дарксторов до крупных распределительных центров.
              </p>
              <p className="text-xl font-semibold text-blue-600 mt-8">
                Смарт даркстор — это путь к цифровой трансформации ритейла без капитальных инвестиций и длительных простоев.
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

export default Retail;
