// /home/kSEN/Desktop/Projects/React/react-shadcn-me/src/app/(learn)/learn/hook/effect/fetch/page.tsx
"use client";

import Link from "next/link";
import UseEffect_Fetch from "@/features/learn/hooks/effect/examples/UseEffect_Fetch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Code, 
  Database, 
  Cpu,
  ExternalLink,
  FileCode
} from "lucide-react";

export default function UseEffectFetchPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/learn/hook/effect">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">useEffect Fetch Örneği</h1>
              <p className="text-muted-foreground">
                JSONPlaceholder API ile veri çekme örneği
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            React Hook
          </Badge>
        </div>
        
        <Separator />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Demo */}
        <div className="lg:col-span-2">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Canlı API Demo
              </CardTitle>
              <CardDescription>
                Gerçek zamanlı veri çekme örneği
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UseEffect_Fetch />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Info & Documentation */}
        <div className="space-y-6">
          {/* Tech Stack */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Teknoloji Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge>React 18</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="outline">Next.js 14</Badge>
                <Badge variant="secondary">shadcn/ui</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
                <Badge>Fetch API</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Kod Örneği
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="hook">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="hook">useEffect Hook</TabsTrigger>
                  <TabsTrigger value="types">TypeScript</TabsTrigger>
                </TabsList>
                <TabsContent value="hook" className="space-y-2">
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>{`useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );
    const data = await response.json();
    setData(data);
  };
  fetchData();
}, []);`}</code>
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="types" className="space-y-2">
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>{`interface UserData {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}`}</code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                Kaynaklar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a 
                href="https://jsonplaceholder.typicode.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Database className="h-4 w-4" />
                  <div>
                    <p className="font-medium">JSONPlaceholder</p>
                    <p className="text-xs text-muted-foreground">Fake REST API</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4" />
              </a>
              
              <a 
                href="https://ui.shadcn.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-xs">cn</span>
                  </div>
                  <div>
                    <p className="font-medium">shadcn/ui</p>
                    <p className="text-xs text-muted-foreground">UI Component Library</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="flex justify-center">
            <Link href="/learn/hook/effect" className="w-full">
              <Button variant="outline" className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" />
                Tüm useEffect Örneklerine Dön
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-sm text-muted-foreground pt-4">
        <p>
          Bu örnek, <strong>useEffect</strong> hook'unun API çağrılarıyla nasıl kullanılacağını göstermektedir.
        </p>
      </div>
    </div>
  );
}