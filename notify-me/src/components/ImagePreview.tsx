"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

function ImagePreview() {
  return (
    <Carousel className="w-2/3">
      <CarouselContent>
        <CarouselItem>
          <Card>
            <CardHeader>
              <CardTitle>Project</CardTitle>
              <CardDescription>
                Each project can have multiple services and multiple users can
                view the project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img src="/1.png" />
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card>
            <CardHeader>
              <CardTitle>Service</CardTitle>
              <CardDescription>
                Each service has multiple secret keys for authentication and
                will send out recieved notifications to the correct providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img src="/2.png" />
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card>
            <CardHeader>
              <CardTitle>Service Dashboard</CardTitle>
              <CardDescription>
                Create new secrets and connect any of our supported providers.
                Each notification has a urgency level which providers can use
                for filtering notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img src="/3.png" />
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
}

export default ImagePreview;
