
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Route, Users, Video, Zap, BarChart3, Package, Check, TrendingUp, Smartphone, Phone, Mail, Map } from "lucide-react";

const Index = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Logo positioned at top left with 4cm offset to the right */}
          <div className="absolute top-8" style={{ left: 'calc(1.5rem + 4cm)' }}>
            <img 
              src="/lovable-uploads/2fbd3ffc-2c98-4dc7-b80a-963941993cce.png" 
              alt="СМАРТ ДАРКСТОР" 
              className="h-16 w-auto"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-16">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Решение для управления заказами и сборочным процессом
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Автоматизируйте сборочные процессы, повысьте эффективность и оптимизируйте работу торговой точки с помощью интеллектуальной системы управления
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToForm}
                  size="lg"
                  className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg transform transition-all hover:scale-105"
                >
                  Оставить заявку
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-3 text-lg border-2 border-blue-600 bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 hover:bg-blue-50 transition-all"
                >
                  Назначить видео-звонок
                </Button>
              </div>
            </div>
            
            <div className="relative flex justify-center">
              <img 
                src="/lovable-uploads/fe9a6acc-be80-4f3f-ba13-20d5bd14feb6.png" 
                alt="Интерфейс системы управления заказами" 
                className="w-full max-w-2xl h-auto"
                style={{ filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.1))' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">200%</div>
              <p className="text-gray-600">рост производительности</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">99%</div>
              <p className="text-gray-600">точность сборки</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">до 70%</div>
              <p className="text-gray-600">сокращение маршрутов при параллельной сборке заказов</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-medium text-gray-900 mb-6">Ключевые возможности</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Инновационный продукт для управления заказами, направленный на повышение эффективности процессов сборки заказов и оптимизацию работы торговых точек (склады, торговые залы, дарксторы)
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Route className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Оптимизация маршрутов и порядка сборки товаров</h3>
                <p className="text-gray-600 flex-grow">Минимизация перемещений сборщиков по торговой точке, сокращение маршрутов до 70%</p>
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

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Прогнозирование времени выполнения заказа</h3>
                <p className="text-gray-600 flex-grow">Точный расчет времени сборки каждого заказа</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-medium text-gray-900 mb-6">Панель управления</h2>
            <p className="text-xl text-gray-600 mb-12">Полный контроль над вашим складским пространством</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 mb-8 shadow-xl">
                <h3 className="text-3xl font-bold text-white mb-2 text-center">Даркстор</h3>
                <div className="w-16 h-1 bg-white/30 mx-auto rounded-full"></div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
                <h4 className="text-2xl font-semibold text-blue-800 mb-8 flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                  Возможности системы
                </h4>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group hover:bg-blue-50 p-3 rounded-lg transition-all duration-200">
                    <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 group-hover:scale-110 transition-transform shadow-md"></div>
                    <span className="text-gray-700 text-lg leading-relaxed group-hover:text-blue-800 transition-colors">Статистика эффективности решения</span>
                  </div>
                  <div className="flex items-start gap-4 group hover:bg-blue-50 p-3 rounded-lg transition-all duration-200">
                    <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 group-hover:scale-110 transition-transform shadow-md"></div>
                    <span className="text-gray-700 text-lg leading-relaxed group-hover:text-blue-800 transition-colors">Аналитика сканирований продуктов</span>
                  </div>
                  <div className="flex items-start gap-4 group hover:bg-blue-50 p-3 rounded-lg transition-all duration-200">
                    <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 group-hover:scale-110 transition-transform shadow-md"></div>
                    <span className="text-gray-700 text-lg leading-relaxed group-hover:text-blue-800 transition-colors">Перемещенные/мульти-расположенные товары</span>
                  </div>
                  <div className="flex items-start gap-4 group hover:bg-blue-50 p-3 rounded-lg transition-all duration-200">
                    <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 group-hover:scale-110 transition-transform shadow-md"></div>
                    <span className="text-gray-700 text-lg leading-relaxed group-hover:text-blue-800 transition-colors">Рекомендации по перемещению уровней полок</span>
                  </div>
                  <div className="flex items-start gap-4 group hover:bg-blue-50 p-3 rounded-lg transition-all duration-200">
                    <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 group-hover:scale-110 transition-transform shadow-md"></div>
                    <span className="text-gray-700 text-lg leading-relaxed group-hover:text-blue-800 transition-colors">Рекомендации по перестановке стеллажей</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl blur-xl"></div>
                <img 
                  src="/lovable-uploads/f894951b-7d88-47fd-91bc-3b60d1f2e3e7.png" 
                  alt="Карта расположения товаров" 
                  className="relative w-full max-w-2xl h-auto rounded-2xl shadow-2xl border border-blue-200"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-medium text-gray-900 mb-6">Преимущества в процессе сборки заказов</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Сокращение маршрутов и параллельная сборка заказов</h3>
                <p className="text-gray-600">Оптимизация маршрутов сборки и снижение количества ошибок, а также возможность параллельно собирать несколько заказов, увеличивая производительность.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Аналитика популярности товаров с помощью тепловой карты</h3>
                <p className="text-gray-600">Тепловая карта, на которой отображаются наиболее популярные и менее востребованные товары. На основании этих данных можно принимать обоснованные решения о перемещении продуктов на полках или стеллажах, что поможет оптимизировать и ускорить процесс сборки товаров.</p>
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
                  <Check className="w-8 h-8 text-white" />
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-medium text-gray-900 mb-6">Технологический процесс внедрения</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-left group bg-gray-50 rounded-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Разметка торгового пространства</h3>
              <p className="text-gray-600">Производится точечная разметка торговой точки с фиксацией расположения полок и привязкой SKU к конкретным местам хранения на основании предоставленного плана помещения. Одновременно формируются возможные маршруты перемещения сборщиков.</p>
            </div>
            
            <div className="text-left group bg-gray-50 rounded-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Оптимизация порядка сборки заказа</h3>
              <p className="text-gray-600">Система переставляет позиции в заказе для минимизации общего пути сборщика, учитывая дополнительные параметры, например, сбор легких товаров в первую очередь, тяжелых последними, что сокращает время сборки заказа.</p>
            </div>
            
            <div className="text-left group bg-gray-50 rounded-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Сбор обратной связи</h3>
              <p className="text-gray-600">Обратная связь от клиента поступает через таск-трекер, электронную почту или мессенджеры. Все обращения фиксируются и систематизируются, после чего специалист анализирует запрос. По результатам обработки клиент получает детальный ответ.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-medium text-gray-900 mb-4">Оставьте заявку</h2>
              <p className="text-xl text-gray-600">
                Задайте вопрос о нашем продукте и решениях или пришлите информацию о вашем проекте.
              </p>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Имя *</label>
                  <Input 
                    id="name"
                    placeholder="Ваше имя" 
                    className="border-gray-300 h-12"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <Input 
                    id="email"
                    placeholder="email@company.com" 
                    type="email"
                    className="border-gray-300 h-12"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
                  <Input 
                    id="phone"
                    placeholder="+7 (999) 123-45-67" 
                    className="border-gray-300 h-12"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Компания</label>
                  <Input 
                    id="company"
                    placeholder="Название компании" 
                    className="border-gray-300 h-12"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">Должность</label>
                <Input 
                  id="position"
                  placeholder="Ваша должность" 
                  className="border-gray-300 h-12"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                <Textarea 
                  id="message"
                  placeholder="Расскажите о ваших потребностях и задачах..."
                  className="border-gray-300 min-h-[120px]"
                />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Нажимая на кнопку, вы даете согласие на обработку своих персональных данных
              </p>
              <Button 
                size="lg"
                className="w-full py-3 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg transform transition-all hover:scale-105"
              >
                Оставьте заявку
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-white">Смарт даркстор</h3>
              <p className="text-lg text-white/90 leading-relaxed">
                Инновационный продукт для управления заказами, направленный на повышение эффективности процессов сборки заказов и оптимизацию работы торговых точек.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/90" />
                <span className="text-lg text-white/90">+7 (495) 255-3978</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/90" />
                <span className="text-lg text-white/90">info@smartdarkstore.ru</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
