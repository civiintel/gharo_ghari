"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import placehoder from "@/public/assests/images/placeholder.webp";

const deals = [
  {
    id: 1,
    title: "50% Off Pizza",
    description: "Get any large pizza for half price!",
    imageUrl: placehoder,
    link: "/deals/pizza-50-off",
  },
  {
    id: 2,
    title: "Free Drink with Meal",
    description: "Order any main course and get a free drink!",
    imageUrl: placehoder,
    link: "/deals/free-drink",
  },
  {
    id: 3,
    title: "Buy 1 Get 1 Free Salad",
    description: "Purchase any salad and get another one free!",
    imageUrl: placehoder,
    link: "/deals/bogo-salad",
  },
  {
    id: 4,
    title: "20% Off First Order",
    description: "New customers get 20% off their first order!",
    imageUrl: placehoder,
    link: "/deals/new-customer-discount",
  },
];

export default function OfferSlider() {
  return (
    <div className="w-full overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {deals.map((deal) => (
            <CarouselItem key={deal.id} className="w-full">
              <Card className="border-none">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={deal.imageUrl}
                      alt={deal.title}
                      width={1200}
                      height={400}
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-6">
                      <h3 className="text-3xl font-bold mb-2">{deal.title}</h3>
                      <p className="text-xl text-center mb-4">
                        {deal.description}
                      </p>
                      <Link href={deal.link} passHref legacyBehavior>
                        <Button asChild size="lg" variant="secondary">
                          <Link href="/delas">View Deal</Link>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}
