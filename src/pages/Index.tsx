import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Route, Users, Video, Zap, BarChart3, Package, Check, TrendingUp, Smartphone, ChevronDown, Phone, Mail } from "lucide-react";
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

const Index = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

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
      {/* Hero Section */}
      <section className="relative py-6 md:py-8 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          {/* Logo, Navigation and CTA */}
          <div className="flex flex-col lg:flex-row lg:items-center mb-4 md:mb-6 gap-4 lg:gap-8">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/2fbd3ffc-2c98-4dc7-b80a-963941993cce.png" 
                alt="СМАРТ ДАРКСТОР" 
                className="h-12 md:h-16 w-auto"
              />
            </div>
            
            {/* Navigation Menu */}
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 bg-transparent text-base px-5 py-2.5">
                    Отрасли
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 p-4 w-[200px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            href="#"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">Ритейл</div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            href="#"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">Логистика и склад</div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/faq"
                      className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-accent transition-colors focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      FAQ
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-accent transition-colors focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      Новости
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-accent transition-colors focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      Контакты
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* CTA Button */}
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Решение для управления заказами и сборочным процессом
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                Автоматизируйте сборочные процессы, повысьте эффективность и оптимизируйте работу торговой точки с помощью интеллектуальной системы управления
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button 
                  onClick={scrollToForm}
                  size="lg"
                  className="px-6 md:px-8 py-3 text-base md:text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg transform transition-all hover:scale-105"
                >
                  Оставить заявку
                </Button>
              </div>
            </div>
            
            <div className="relative flex justify-center mt-8 lg:mt-0">
              <img 
                src="/lovable-uploads/fe9a6acc-be80-4f3f-ba13-20d5bd14feb6.png" 
                alt="Интерфейс системы управления заказами" 
                className="w-full max-w-md lg:max-w-2xl h-auto"
                style={{ filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.1))' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">99%</div>
              <p className="text-gray-600 text-sm md:text-base">точность сборки</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">до 70%</div>
              <p className="text-gray-600 text-sm md:text-base">сокращение маршрутов при параллельной сборке заказов</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">до 25%</div>
              <p className="text-gray-600 text-sm md:text-base">сокращение маршрутов при заказах до 15 позиций</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 md:mb-6">Ключевые возможности</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Инновационный продукт для управления заказами, направленный на повышение эффективности процессов сборки заказов и оптимизацию работы торговых точек (склады, торговые залы, дарксторы)
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6 md:p-8 text-center h-full flex flex-col">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <Route className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Оптимизация маршрутов и порядка сборки товаров</h3>
                <p className="text-gray-600 flex-grow text-sm md:text-base">Минимизация перемещений сборщиков по торговой точке, сокращение маршрутов до 70%</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6 md:p-8 text-center h-full flex flex-col">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <Video className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Система управления торговой точкой на основе видеоаналитики</h3>
                <p className="text-gray-600 flex-grow text-sm md:text-base">Контроль и мониторинг состояния полок, загроможденности проходов между стеллажами и размещения товаров в торговом зале</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6 md:p-8 text-center h-full flex flex-col">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Прогнозирование загруженности торговой точки и сборщиков</h3>
                <p className="text-gray-600 flex-grow text-sm md:text-base">Учет загрузки торговой точки, «узких мест» маршрутов, эффективное распределение ресурсов и минимизация простоев</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6 md:p-8 text-center h-full flex flex-col">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Прогнозирование времени выполнения заказа</h3>
                <p className="text-gray-600 flex-grow text-sm md:text-base">Максимально приближенный к точному расчет времени сборки каждого заказа</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Functionality Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 md:mb-6">Функционал платформы</h2>
          </div>
          
          <div className="space-y-12 md:space-y-16">
            {/* First Block - Heat Map (Image Left, Text Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/d7d8a3e1-6d57-4cef-b9fe-62d29713d493.png" 
                  alt="Тепловая карта стеллажей" 
                  className="w-full h-auto shadow-2xl rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-medium text-gray-900">Тепловая карта стеллажей</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Инструмент визуализации данных о товарных зонах и стеллажах внутри даркстора. Цель — быстрое понимание распределения популярности товаров и эффективности расположения ассортимента.
                </p>
              </div>
            </div>

            {/* Second Block - Shelf Recommendations (Text Left, Image Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
              <div className="space-y-4 order-2 lg:order-1">
                <h3 className="text-xl md:text-2xl font-medium text-gray-900">Рекомендации по перестановке стеллажей</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Инструмент для оптимизации даркстора на основе анализа популярности товаров. Цель — показать, как изменить расположение стеллажей, чтобы ускорить сборку заказов и повысить эффективность работы сборщиков.
                </p>
              </div>
              <div className="relative order-1 lg:order-2">
                <img 
                  src="/lovable-uploads/01d2996b-c05a-4751-8c81-57b657ae6be2.png" 
                  alt="Рекомендации по перестановке стеллажей" 
                  className="w-full h-auto shadow-2xl rounded-lg"
                />
              </div>
            </div>

            {/* Third Block - Rack Optimization (Image Left, Text Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/0466bc07-f645-40d5-964b-6052b0a31e3e.png" 
                  alt="Рекомендации по перестановке полок в стеллаже" 
                  className="w-full h-auto shadow-2xl rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-medium text-gray-900">Рекомендации по перестановке полок в стеллаже</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Инструмент для оптимизации внутреннего устройства стеллажа. Цель — переместить полки с наиболее популярными товарами на эргономичный уровень, например, с нижнего уровня на средний, чтобы повысить доступ и увеличить скорость сборки.
                </p>
              </div>
            </div>

            {/* Fourth Block - Efficiency Analysis (Text Left, Image Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
              <div className="space-y-4 order-2 lg:order-1">
                <h3 className="text-xl md:text-2xl font-medium text-gray-900">Эффективность оптимизации маршрутов и выкладки</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Инструмент для анализа результативности решений по оптимизации работы даркстора. Цель — показать количество сборочных листов с оптимизированными маршрутами.
                </p>
              </div>
              <div className="relative order-1 lg:order-2">
                <img 
                  src="/lovable-uploads/609549b4-6eb5-4192-8aeb-1854479706a4.png" 
                  alt="Эффективность оптимизации маршрутов и выкладки" 
                  className="w-full h-auto shadow-2xl rounded-lg"
                />
              </div>
            </div>

            {/* Fifth Block - Analytics for Relocated Products (Image Left, Text Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/7d1d0fb4-b62d-438e-871a-ab411e539987.png" 
                  alt="Аналитика по перемещенным товарам" 
                  className="w-full h-auto shadow-2xl rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-medium text-gray-900">Аналитика по перемещенным товарам</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Инструмент оценки эффективности изменений в планограмме даркстора. Цель — показать, как перемещение товаров повлияло на сокращение маршрута сборщиков заказов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 md:mb-6">Преимущества в процессе сборки заказов</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Сокращение маршрутов и параллельная сборка заказов</h3>
                <p className="text-gray-600 text-sm md:text-base">Оптимизация маршрутов сборки и снижение количества ошибок, а также возможность параллельно собирать несколько заказов, увеличивая производительность.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Аналитика популярности товаров с помощью тепловой карты</h3>
                <p className="text-gray-600 text-sm md:text-base">Тепловая карта, на которой отображаются наиболее популярные и менее востребованные товары. На основании этих данных можно принимать обоснованные решения о перемещении продуктов на полках или стеллажах, что поможет оптимизировать и ускорить процесс сборки товаров.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Оптимизация выкладки товаров</h3>
                <p className="text-gray-600 text-sm md:text-base">Рекомендации по размещению товаров на основе популярности заказов и рекомендации по перемещению товаров, уровней полок и стеллажей для повышения эффективности.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <Check className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Оценка эффективности расположения товаров</h3>
                <p className="text-gray-600 text-sm md:text-base">Предоставляем недельную статистику для анализа эффективности размещения товаров.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Оптимизация времени сборки</h3>
                <p className="text-gray-600 text-sm md:text-base">Существенное сокращение времени сборки заказов на площадях от 200 кв.м при наличии более шести позиций в заказе, повышая производительность персонала.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Аппаратно-независимое решение</h3>
                <p className="text-gray-600 text-sm md:text-base">Поддержка различных форм-факторов устройств (ТСД, тележки и др.) в зависимости от типа сборки. Интеграция с IT-системами ритейлера осуществляется через API, что обеспечивает оперативность и надежность обмена данными.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 md:mb-6">Технологический процесс внедрения</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-left group bg-gray-50 rounded-lg p-6 md:p-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6 text-white text-lg md:text-2xl font-bold group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Разметка торгового пространства</h3>
              <p className="text-gray-600 text-sm md:text-base">Производится точечная разметка торговой точки с фиксацией расположения полок и привязкой SKU к конкретным местам хранения на основании предоставленного плана помещения. Одновременно формируются возможные маршруты перемещения сборщиков.</p>
            </div>
            
            <div className="text-left group bg-gray-50 rounded-lg p-6 md:p-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6 text-white text-lg md:text-2xl font-bold group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Оптимизация порядка сборки заказа</h3>
              <p className="text-gray-600 text-sm md:text-base">Система переставляет позиции в заказе для минимизации общего пути сборщика, учитывая дополнительные параметры, например, сбор легких товаров в первую очередь, тяжелых последними, что сокращает время сборки заказа.</p>
            </div>
            
            <div className="text-left group bg-gray-50 rounded-lg p-6 md:p-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6 text-white text-lg md:text-2xl font-bold group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Сбор обратной связи</h3>
              <p className="text-gray-600 text-sm md:text-base">Обратная связь от клиента поступает через таск-трекер, электронную почту или мессенджеры. Все обращения фиксируются и систематизируются, после чего специалист анализирует запрос. По результатам обработки клиент получает детальный ответ.</p>
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

export default Index;

