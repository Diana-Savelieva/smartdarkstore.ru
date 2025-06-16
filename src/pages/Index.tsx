
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Route, Users, Video, Zap, BarChart3, Package, Target, TrendingUp, Smartphone } from "lucide-react";

const Index = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')"
          }}
        ></div>
        
        <div className="container mx-auto px-6 relative z-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Революционное решение для управления заказами и сборочным процессом
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Автоматизируйте сборочные процессы, повысьте эффективность и оптимизируйте работу торговой точки с помощью интеллектуальной системы управления
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToForm}
              className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg transform transition-all hover:scale-105"
            >
              Оставить заявку
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-4 text-lg border-2 border-white bg-white/10 backdrop-blur-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 hover:bg-white/20 transition-all"
            >
              Назначить zoom-звонок
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">до 70%</div>
              <p className="text-gray-600">сокращение маршрутов при параллельной сборке заказа</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">200+</div>
              <p className="text-gray-600">кв.м оптимизированных площадей</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">6+</div>
              <p className="text-gray-600">позиций в заказе для максимальной эффективности</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ключевые возможности</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Инновационный продукт для управления заказами, направленный на повышение эффективности процессов сборки заказов и оптимизацию работы торговых точек (склады, торговые залы, дарксторы)
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Прогнозирование времени выполнения заказа</h3>
                <p className="text-gray-600 flex-grow">Точный расчет времени сборки каждого заказа</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Route className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Оптимизация маршрутов и порядка сборки товаров</h3>
                <p className="text-gray-600 flex-grow">Минимизация перемещений сборщиков по торговой точке, сокращение маршрутов до 25-70%</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Прогнозирование загруженности торговой точки и сборщиков</h3>
                <p className="text-gray-600 flex-grow">Учет загрузки торговой точки, «узких мест» маршрутов, эффективное распределение ресурсов и минимизация простоев</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Система управления торговой точкой на основе видеоаналитики</h3>
                <p className="text-gray-600 flex-grow">Контроль и мониторинг состояния полок и размещения товаров в торговом зале</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Преимущества в процессе сборки заказов</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Сокращение маршрутов и параллельная сборка заказов</h3>
                <p className="text-gray-600">Позволяет одновременно собирать несколько заказов с повышенной скоростью, сокращать маршруты сборки и снижать количество ошибок.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Аналитика популярности товаров с помощью тепловой карты</h3>
                <p className="text-gray-600">Тепловая карта, на которой отображаются наиболее популярные и менее востребованные товары. На основании этих данных можно принимать обоснованные решения о перемещении продуктов на полках или стеллажах.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Оптимизация выкладки товаров</h3>
                <p className="text-gray-600">Рекомендации по размещению товаров на основе популярности заказов и рекомендации по перемещению товаров, уровней полок и стеллажей для повышения эффективности.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Оценка эффективности расположения товаров</h3>
                <p className="text-gray-600">Предоставляем недельную статистику для анализа эффективности размещения товаров.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Оптимизация времени сборки</h3>
                <p className="text-gray-600">Существенное сокращение времени сборки заказов на площадях от 200 кв.м при наличии более шести позиций в заказе, повышая производительность персонала.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Аппаратно-независимое решение</h3>
                <p className="text-gray-600">Поддержка различных форм-факторов устройств (ТСД, тележки и др.) в зависимости от типа сборки. Интеграция с IT-системами ритейлера осуществляется через API, что обеспечивает оперативность и надежность обмена данными.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Технологический процесс внедрения</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Разметка торгового пространства</h3>
              <p className="text-gray-600">Производится точечная разметка торговой точки с фиксацией расположения полок и привязкой SKU к конкретным местам хранения на основании данных заказчика. Одновременно формируются возможные маршруты перемещения сборщиков.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Оптимизация порядка сборки заказа</h3>
              <p className="text-gray-600">Система переставляет позиции в заказе для минимизации общего пути сборщика, учитывая дополнительные параметры, например, сбор легких товаров в первую очередь, тяжелых последними.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Сбор обратной связи</h3>
              <p className="text-gray-600">Обратная связь от клиента поступает через таск-трекер, электронную почту или мессенджеры. Все обращения фиксируются и систематизируются, после чего ответственный специалист оперативно анализирует запрос. По результатам обработки клиент получает детальный ответ и, при необходимости, регулярные обновления о ходе выполнения.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gradient-to-br from-blue-400 to-cyan-400">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Получить консультацию</h2>
            <p className="text-xl text-white/90 mb-8">Оставьте заявку и наш специалист свяжется с вами в течение 30 минут</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  placeholder="Ваше имя" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 backdrop-blur-sm"
                />
                <Input 
                  placeholder="Телефон" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 backdrop-blur-sm"
                />
              </div>
              <Input 
                placeholder="Email" 
                type="email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 backdrop-blur-sm"
              />
              <Textarea 
                placeholder="Расскажите о вашем проекте"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 backdrop-blur-sm min-h-[120px]"
              />
              <Button 
                className="w-full py-4 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg transform transition-all hover:scale-105"
              >
                Получить консультацию
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">СМАРТ ДАРКСТОР</h3>
            <div className="space-y-2">
              <p className="text-white/90">info@smartdarkstore.ru</p>
              <p className="text-white/90">+7 (495) 255-3978</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
