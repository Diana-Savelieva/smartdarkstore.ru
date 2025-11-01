import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Calendar, User as UserIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
import { MobileMenu } from "@/components/MobileMenu";
import articleImage from "@/assets/article-smart-darkstore.png";
import articleDiagram from "@/assets/article-diagram.png";
import dianaPhoto from "@/assets/diana.png";

const Article1 = () => {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
            
            <MobileMenu />
            
            <Button 
              asChild
              className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white border-0 shadow-lg transition-all duration-500 animate-gradient lg:ml-auto text-sm md:text-base px-4 md:px-6"
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

      {/* Article Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
                  Новости
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Смарт даркстор — решение для ритейла и логистики
                </h1>
                <div className="flex flex-wrap gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5" />
                    <span>Диана Савельева</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>29.10.2025</span>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src={articleImage} 
                  alt="Смарт даркстор" 
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Table of Contents */}
            <div className="backdrop-blur-sm bg-blue-50/50 rounded-2xl p-6 md:p-8 mb-12 border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Содержание</h2>
              <nav className="space-y-2">
                <button onClick={() => scrollToSection('section-1')} className="block text-blue-600 hover:text-blue-800 transition-colors text-left">
                  1. Смарт даркстор
                </button>
                <button onClick={() => scrollToSection('section-2')} className="block text-blue-600 hover:text-blue-800 transition-colors text-left">
                  2. Основные проблемы, с которыми сталкивается ритейл при сборке и аналитике заказов
                </button>
                <button onClick={() => scrollToSection('section-3')} className="block text-blue-600 hover:text-blue-800 transition-colors text-left">
                  3. Как Смарт даркстор помогает решать эти проблемы?
                </button>
                <button onClick={() => scrollToSection('section-4')} className="block text-blue-600 hover:text-blue-800 transition-colors text-left">
                  4. Преимущества для бизнеса
                </button>
              </nav>
            </div>

            {/* Article Sections */}
            <article className="prose prose-lg max-w-none">
              <div id="section-1" className="mb-12 scroll-mt-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase">Смарт даркстор</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Смарт даркстор — решение для управления заказами и сборочным процессом в торговых точках. Длинные и неудобные маршруты сборщиков, неравномерная нагрузка, неточные прогнозы времени выполнения заказов и фрагментарная аналитика приводят к снижению производительности, ошибкам и ухудшению сервиса. В этой статье расскажем, как наш продукт помогает преобразить процесс сборки заказов, решая ключевые проблемы ритейла.
                </p>
              </div>

              <div id="section-2" className="mb-12 scroll-mt-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase">Основные проблемы, с которыми сталкивается ритейл при сборке и аналитике заказов</h2>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span><strong>Неоптимизированные маршруты сборки:</strong> сборщики тратят время, перемещаясь по длинным и неэффективным маршрутам, что замедляет процесс сборки заказов и снижает общую производительность.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span><strong>Неравномерное распределение нагрузки:</strong> перегрузка сборщиков приводит к задержкам и ошибкам, что снижает общую эффективность работы.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span><strong>Низкая точность прогноза времени сборки заказов:</strong> клиенты остаются без четкой информации о времени готовности заказа, что снижает уровень сервиса.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span><strong>Фрагментарная и непрозрачная аналитика:</strong> традиционные системы видеоконтроля и учета не позволяют оперативно реагировать на изменения в складе или дарксторе, что приводит к потерям и сбоям.</span>
                  </li>
                </ul>
              </div>

              <div id="section-3" className="mb-12 scroll-mt-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase">Как Смарт даркстор помогает решать эти проблемы?</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Наше решение позволяет автоматизировать сборочные процессы, повысить эффективность и оптимизировать работу торговой точки с помощью интеллектуальной системы управления.
                </p>
                <ul className="space-y-4 text-gray-700 mb-8">
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span><strong>Подбор самых оптимальных маршрутов:</strong> наша система учитывает более 10 параметров — массу, объем товаров, функциональные зоны (морозильники, химия и другие), подбирает самый короткий и эффективный путь для каждого заказа. Чем больше позиций — тем больше выгода от алгоритма.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span><strong>AI-помощник менеджера:</strong> помогает пользователям быстро находить нужную информацию о перемещении стеллажей или уровней полок, отвечать на частые вопросы и сопровождать их на каждом этапе взаимодействия.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span><strong>Персональные маршруты для сотрудников:</strong> система анализирует опыт и стиль работы каждого сборщика, формируя индивидуальные рекомендации. Новички и опытные сотрудники получат разные оптимальные маршруты.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span><strong>Навигация для сборки:</strong> маршрут отображается прямо на терминалах сбора заказов, благодаря чему даже новые сотрудники быстро ориентируются и работают без ошибок.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span><strong>Рекомендации по перестановке:</strong> учитывается популярность товаров, товарное соседство и другие параметры. На основе аналитики популярности (тепловой карты) система рекомендует перестановку полок и стеллажей, ускоряя процесс комплектации заказов и снижая нагрузку на персонал.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span><strong>Прогнозирование времени выполнения:</strong> благодаря точным расчетам заказчики получают четкую и реальную информацию о сроках готовности заказов.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span><strong>Параллельная сборка заказов:</strong> возможность одновременной обработки нескольких заказов, что помогает справиться с заказами в пиковые часы без перегрузки.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span><strong>Полная интеграция с IT-системами ритейлеров:</strong> гибкая API-интеграция и поддержка различных устройств обеспечивают простоту внедрения и надежность работы системы.</span>
                  </li>
                </ul>
              </div>

              <div id="section-4" className="mb-12 scroll-mt-20">
                <div className="mb-8">
                  <img 
                    src={articleDiagram} 
                    alt="Преимущества для бизнеса" 
                    className="w-full rounded-2xl shadow-lg"
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase">Преимущества для бизнеса</h2>
                <ul className="space-y-3 text-gray-700 mb-8">
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span>Сокращение времени сборки заказов на 15-25%, а маршрутов сборщиков — до 70%.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span>Минимизация ошибок и повышение точности сборки — до 99%.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span>Оптимальное распределение нагрузки между сотрудниками.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0 mt-0.5"></span>
                    <span>Комплексная аналитика и рекомендации для улучшения работы торговой точки.</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Смарт даркстор — это не просто система управления заказами, а комплексный инструмент, который трансформирует работу торговых точек, дарксторов и складов. Решая главные проблемы ритейла: от неоптимальных маршрутов и перегрузки персонала до непрозрачной аналитики и низкой точности прогноза, наше решение позволяет повысить производительность и снизить количество ошибок. Персональные рекомендации, интеграция с существующими IT-системами и AI-ассистент менеджера делают этот продукт незаменимым помощником для современного ритейла. Внедряйте инновации и становитесь лидером рынка вместе с «Навигационными решениями»!
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Если вам интересно узнать, как решение Смарт даркстор может повысить эффективность вашей торговой точки, наша команда готова провести консультацию.
                </p>
                <p className="text-gray-700">
                  Напишите свой запрос на почту <a href="mailto:sasha@smartdarkstore.ru" className="text-blue-600 hover:text-blue-800">sasha@smartdarkstore.ru</a>.
                </p>
              </div>
            </article>

            {/* Author Section */}
            <div className="backdrop-blur-sm bg-blue-50/50 rounded-2xl p-6 md:p-8 border border-blue-100 mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase">Об авторе статьи</h3>
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 ring-4 ring-blue-500/20">
                  <AvatarImage src={dianaPhoto} alt="Диана Савельева" />
                  <AvatarFallback>ДС</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">Диана Савельева</h4>
                  <p className="text-blue-600 font-medium mb-3">Маркетолог</p>
                  <p className="text-gray-700 leading-relaxed">
                    Диана имеет большой опыт стратегического маркетингового планирования и PR-коммуникаций в сфере B2B и отвечает за маркетинговое продвижение решений для позиционирования и отслеживания активов в помещениях. Диана всегда открыта для новых креативных подходов к маркетинговым коммуникациям.
                  </p>
                </div>
              </div>
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

export default Article1;
