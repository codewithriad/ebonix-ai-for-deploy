import {
  IconClick,
  IconCreditCard,
  IconLayoutDashboard,
  IconSquareLetterT,
} from "@tabler/icons-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const DashboardHeader: React.FC = () => {
  return (
    <div className="py-6 relative">
      {/* right side of dashboard */}
      <div className="absolute top-8 md:top-60 right-0 md:-right-16 -rotate-12 w-12 h-12 bg-[#e8f9ee] border-b-4 border-l-4 border-[#8B6BF3] rounded-xl flex justify-center items-center z-50">
        <IconLayoutDashboard stroke={2} className="text-[#8B6BF3] w-8 h-8" />
      </div>

      <div className="py-6">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p className="text-para">Welcome</p>
          <h2 className="text-xl font-semibold text-foreground">
            Jayden Smith
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
        {/* card 1 */}
        <Card className="lg:col-span-2 bg-background text-foreground border shadow-cardShadow shadow-md w-full">
          <CardHeader>
            <CardTitle>
              <IconCreditCard />
            </CardTitle>
            <CardDescription>
              You are currently using our <strong>Free Plan</strong>.<br />
              Usage renews at Tue, Mar 5, 2024 at 12:22:39 AM GMT+4.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button className="ml-4 px-4 py-2 text-xs bg-foreground text-background rounded-lg">
              Upgrade plan
            </button>
          </CardContent>
        </Card>

        {/* card 2 */}
        <Card className="lg:col-span-1 bg-background text-foreground border shadow-cardShadow shadow-md">
          <CardHeader>
            <CardTitle className="text-sm bg-[#E7FF9B] w-8 h-8 flex justify-center items-center">
              <IconSquareLetterT className="w-5 h-5" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <h3 className="text-3xl font-bold">13,500</h3>
            <CardDescription>
              <p>Total Token Left</p>
            </CardDescription>
          </CardContent>
          <CardFooter>
            <button className="my-4 ml-4 px-2 py-3 text-xm border rounded-lg border-para bg-background text-para flex justify-between items-center gap-2">
              <IconClick />
              <span className="text-[10px]">Buy additional credits</span>
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHeader;
