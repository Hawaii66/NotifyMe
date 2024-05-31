import Link from "next/link";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import ImagePreview from "../ImagePreview";

export function HomePage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="flex justify-center items-center py-12 md:py-24 lg:py-32 xl:py-48 w-full h-screen">
          <div className="px-4 md:px-6 container">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="relative flex flex-col justify-center items-center gap-8">
                  <img
                    src="/icon.png"
                    className="rounded-full w-20 aspect-square"
                  />
                  <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl/none tracking-tighter">
                    Direct Alert
                  </h1>
                </div>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A simple and reliable notification server for your business.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex justify-center items-center bg-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 dark:bg-gray-50 disabled:opacity-50 shadow px-4 py-2 rounded-md h-9 font-medium text-gray-50 text-sm dark:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none dark:focus-visible:ring-gray-300"
                  href="/dashboard"
                >
                  Get Started
                </Link>
                <Link
                  className="inline-flex justify-center items-center border-gray-200 dark:border-gray-800 bg-white hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-950 disabled:opacity-50 shadow-sm px-4 py-2 border rounded-md h-9 font-medium text-sm hover:text-gray-900 transition-colors b focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:hover:text-gray-50 disabled:pointer-events-none dark:focus-visible:ring-gray-300"
                  href="/docs"
                >
                  Learn More
                </Link>
              </div>
              <img src="/4.png" />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="gap-12 grid px-4 md:px-6 container">
            <div className="flex flex-col justify-center items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg text-sm">
                  Dashboard UI
                </div>
                <h2 className="font-bold text-3xl sm:text-5xl tracking-tighter">
                  Image Gallery
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Create projects and services. Each service can recieve
                  notifications that will be sent out to the providers based on
                  notification urgency level.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center mx-auto rounded-lg max-w-5xl">
              <ImagePreview />
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="gap-12 grid px-4 md:px-6 container">
            <div className="flex flex-col justify-center items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg text-sm">
                  Providers
                </div>
                <h2 className="font-bold text-3xl sm:text-5xl tracking-tighter">
                  3rd Party Providers
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  We currently support <b>5</b> providers where you can recieve
                  your notifications
                </p>
              </div>
            </div>
            <div className="border-gray-200 dark:border-gray-800 grid md:grid-cols-3 mx-auto border rounded-lg md:divide-x divide-y md:divide-y-0 divide-border max-w-5xl">
              <div className="gap-1 grid p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-xl">Slack</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Direct Alert integrates directly with Slack, allowing you to
                  send notifications to your Slack channels and direct messages.
                </p>
              </div>
              <div className="gap-1 grid p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-xl">Discord</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Direct Alert can send notifications to your Discord servers
                  keeping your team informed in real-time.
                </p>
              </div>
              <div className="gap-1 grid p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-xl">Trello</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Direct Alert can add cards your Trello boards with important
                  notifications, helping your team stay on top of their tasks.
                </p>
              </div>
              <div className="gap-1 grid p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-xl">Email</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Direct Alert can send notifications directly to your teams
                  email inboxes, ensuring they never miss an important update.
                </p>
              </div>
              <div className="gap-1 grid p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-xl">
                    Phone{" "}
                    <span className="inline-block bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg text-sm">
                      Comming soon
                    </span>
                  </h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Direct Alert can deliver notifications via SMS or voice call,
                  keeping your team informed even when they are on the go.
                </p>
              </div>
              <div className="gap-1 grid p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-xl">Our Dashboard</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Get a flexible view of all the notifications we have recieved
                  from your services
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <Link className="col-start-3" href={"/dashboard"}>
                <Button variant={"outline"}>Try for free !</Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="gap-12 grid px-4 md:px-6 container">
            <div className="flex flex-col justify-center items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg text-sm">
                  Key Features
                </div>
                <h2 className="font-bold text-3xl sm:text-5xl tracking-tighter">
                  Easy Setup and Reliable Notifications
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Direct Alert is designed for <b>easy setup</b> and{" "}
                  <b>reliable</b> notifications, efficiently handling
                  high-volume communication. It ensures prompt and dependable
                  message delivery, ideal for users who value <b>simplicity</b>{" "}
                  and <b>reliability</b> in their notification systems
                </p>
              </div>
            </div>
            <div className="border-gray-200 dark:border-gray-800 grid md:grid-cols-3 mx-auto border rounded-lg md:divide-x divide-y md:divide-y-0 divide-border max-w-5xl">
              <div className="gap-1 grid p-8 md:p-10">
                <h3 className="font-bold text-xl">Scalable Infrastructure</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Direct Alert cloud-based infrastructure scales automatically
                  to handle your notification needs, no matter how large.
                </p>
              </div>
              <div className="gap-1 grid p-8 md:p-10">
                <h3 className="font-bold text-xl">Reliable Delivery</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  With built-in retries and failover mechanisms, Direct Alert
                  ensures your notifications are delivered, even in the face of
                  temporary network issues.
                </p>
              </div>
              <div className="gap-1 grid p-8 md:p-10">
                <h3 className="font-bold text-xl">Flexible Integrations</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Direct Alert seamlessly integrates with your existing systems,
                  allowing you to send notifications from your current services
                  over HTTPS
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex sm:flex-row flex-col items-center gap-2 px-4 md:px-6 py-6 border-t w-full shrink-0">
        <p className="text-gray-500 text-xs dark:text-gray-400">
          © 2024 Direct Alert. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
