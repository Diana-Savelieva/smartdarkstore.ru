import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const FAQ = () => {
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

  const faqCategories = [
    {
      category: "О продукте",
      questions: [
        {
          question: "Что такое Смарт даркстор?",
          answer: "Смарт даркстор — это инновационное решение для оптимизации процессов сборки и комплектации заказов на складах и торговых точках. Система сокращает маршруты сборщиков, ускоряет обработку заказов и минимизирует ошибки."
        },
        {
          question: "Какие ключевые задачи решает Смарт даркстор?",
          answer: "Среди ключевых задач, которые решает Смарт даркстор — длинные, неоптимизированные маршруты сборщиков, неравномерная нагрузка на сотрудников, высокая доля ошибок при сборке заказов, недостаток аналитики внутренних процессов."
        },
        {
          question: "В каких сферах применимо решение?",
          answer: "Решение подходит для ритейла, розничной торговли, логистических центров и складов с контролируемым температурным режимом (хранение продуктов, FMCG). Идеально для бизнеса, требующего высокой точности и скорости комплектации."
        }
      ]
    },
    {
      category: "Внедрение и интеграция",
      questions: [
        {
          question: "Как происходит интеграция с существующими IT-системами?",
          answer: "Интеграция основана на взаимодействии через API, без изменения программной логики систем клиента. Смарт даркстор взаимодействует с системами WMS, ERP и другими, передавая данные по стандартным протоколам, что обеспечивает простоту и безопасность внедрения."
        },
        {
          question: "Нужно ли специальное оборудование для работы с системой?",
          answer: "Оборудование не требуется. Система функционирует на базе существующей IT-инфраструктуры клиента и может использовать имеющуюся систему видеонаблюдения для видеоаналитики."
        },
        {
          question: "Как долго длится внедрение решения?",
          answer: "Средний срок внедрения решения составляет 4 недели."
        }
      ]
    },
    {
      category: "Преимущества и результаты",
      questions: [
        {
          question: "Какие выгоды получает бизнес от внедрения Смарт даркстор?",
          answer: "Сокращение времени комплектации заказов на 15–25%, уменьшение длины маршрутов сборщиков до 70%, снижение ошибок при сборке заказов до 99%, равномерное распределение нагрузки на сотрудников и повышение прозрачности процессов."
        },
        {
          question: "Как Смарт даркстор помогает снизить операционные расходы?",
          answer: "Повышение операционной эффективности происходит за счет автоматизации процессов, сокращения маршрутов сборщиков, рекомендаций по перемещению стеллажей, полок, отдельных товаров и равномерного распределения нагрузки между сотрудниками."
        },
        {
          question: "Какие отчёты и аналитические данные доступны пользователям?",
          answer: "Доступны тепловая карта даркстора, рекомендации по перестановке стеллажей, полок и отдельных товаров, аналитика по перемещенным товарам и отчет по эффективности решения."
        }
      ]
    },
    {
      category: "Специальные возможности",
      questions: [
        {
          question: "Предусмотрены ли решения для работы с товарами, требующими специального температурного режима?",
          answer: "Да, система учитывает температурные режимы, вес, габариты товаров и другие параметры, оптимизируя сборочные листы."
        },
        {
          question: "Нужны дополнительные функции",
          answer: "Если вашему бизнесу требуются уникальные дополнительные функции, мы готовы разработать и интегрировать их в систему. Свяжитесь с нами для обсуждения индивидуальных потребностей по электронной почте sasha@smartdarkstore.ru."
        }
      ]
    },
    {
      category: "Стоимость и поддержка",
      questions: [
        {
          question: "Как рассчитывается стоимость внедрения?",
          answer: "Цена формируется индивидуально и зависит от масштаба и задач бизнеса. Модель оплаты включает разовый платеж за внедрение и ежемесячную подписку за поддержку и использование системы."
        },
        {
          question: "Как получить поддержку в случае необходимости?",
          answer: "Мы предоставляем услуги технической поддержки на всех этапах работы с нашей системой — во время внедрения, интеграции, а также в процессе эксплуатации. Если вам нужна помощь, обратитесь к нам по адресу sasha@smartdarkstore.ru, и наша команда оперативно решит ваши вопросы."
        },
        {
          question: "Что делать, если я сомневаюсь, подойдет ли данное решение для моего бизнеса?",
          answer: "Вы можете связаться с нашей командой через sasha@smartdarkstore.ru, описать бизнес-задачи, получить консультацию, демонстрацию системы и оценку проекта."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative py-6 md:py-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/2fbd3ffc-2c98-4dc7-b80a-963941993cce.png" 
                alt="СМАРТ ДАРКСТОР" 
                className="h-12 md:h-16 w-auto"
              />
            </Link>
            
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
                    <Link
                      to="/news"
                      className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-accent transition-colors focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      Новости
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/contacts"
                      className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-accent transition-colors focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      Контакты
                    </Link>
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
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Часто задаваемые вопросы
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Ответы на популярные вопросы о системе Смарт даркстор
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((item, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${categoryIndex}-${index}`}
                      className="bg-white rounded-lg shadow-md border-0 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-blue-50 transition-colors">
                        <span className="text-lg font-medium text-gray-900 pr-4">
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2">
                        <p className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
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

export default FAQ;
