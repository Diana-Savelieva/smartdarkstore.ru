import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Меню</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="industries">
              <AccordionTrigger className="text-base font-medium">
                Отрасли
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2 pl-4">
                  <Link
                    to="/retail"
                    className="py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setOpen(false)}
                  >
                    Ритейл
                  </Link>
                  <Link
                    to="/logistics"
                    className="py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setOpen(false)}
                  >
                    Логистика и склад
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Link
            to="/faq"
            className="text-base font-medium text-gray-700 hover:text-blue-600 py-2"
            onClick={() => setOpen(false)}
          >
            FAQ
          </Link>
          
          <Link
            to="/news"
            className="text-base font-medium text-gray-700 hover:text-blue-600 py-2"
            onClick={() => setOpen(false)}
          >
            Новости
          </Link>
          
          <Link
            to="/contacts"
            className="text-base font-medium text-gray-700 hover:text-blue-600 py-2"
            onClick={() => setOpen(false)}
          >
            Контакты
          </Link>
          
          <Button
            asChild
            className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 text-white border-0 shadow-lg mt-4 text-sm"
          >
            <a
              href="https://planerka.app/aleksandra-buvasheva-17mrhw/30-minutnyy-zvonok-s-menedzherom-smart-darkstor"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Назначить видеозвонок
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
