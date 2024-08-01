import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
const CompanyBasedinterview = (companyData: any) => {
  const router = useRouter()
    console.log(companyData);
    const handleInterviewStart = () => {
    router.push(`/interview?company=${companyData.companyData.name}`);
    }
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {companyData.companyData.name}
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleInterviewStart}>
          Start Interview
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">8</div>
        <p className="text-xs text-muted-foreground">Interviews completed</p>
      </CardContent>
    </Card>
  );
};

export default CompanyBasedinterview;
