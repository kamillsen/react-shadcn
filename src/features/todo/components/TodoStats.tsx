// src/features/todo/components/TodoStats.tsx
'use client';

import { useTodos } from '../context/TodoContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  Target,
  Calendar
} from 'lucide-react';

export default function TodoStats() {
  const { getStats, state } = useTodos();
  const stats = getStats();
  const { filter } = state;

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  const statsConfig = [
    {
      title: 'Toplam',
      value: stats.total,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Tamamlanan',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Devam Eden',
      value: stats.active,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Süresi Geçen',
      value: stats.overdue,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const priorityStats = [
    {
      level: 'Yüksek',
      count: stats.byPriority.high,
      color: 'bg-red-500',
    },
    {
      level: 'Orta',
      count: stats.byPriority.medium,
      color: 'bg-yellow-500',
    },
    {
      level: 'Düşük',
      count: stats.byPriority.low,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Görevler için genel istatistik kartı */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            İstatistikler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Toplam, Tamamlanan, Devam Eden ve Süresi Geçen görev sayılarını gösteren mini kartlar */}
          <div className="grid grid-cols-2 gap-3">
            {statsConfig.map((stat) => (
              <div
                key={stat.title}
                className="flex flex-col items-center justify-center p-4 rounded-lg border"
              >
                <div className={`p-2 rounded-full ${stat.bgColor} mb-2`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.title}</span>
              </div>
            ))}
          </div>

          {/* Tamamlanma oranını yüzde olarak ve progress bar ile gösteren kart alanı */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tamamlanma Oranı</span>
              <span className="font-medium">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Görevlerin öncelik seviyelerine göre dağılımını gösteren kart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Öncelik Dağılımı
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {priorityStats.map((priority) => (
            <div key={priority.level} className="space-y-2">
              {/* İlgili öncelik seviyesindeki görev adedi satırı */}
              <div className="flex justify-between text-sm">
                <span className="font-medium">{priority.level} Öncelik</span>
                <span>{priority.count} görev</span>
              </div>

              {/* İlgili önceliğin toplam içindeki yüzde payını gösteren progress bar alanı */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${priority.color} rounded-full`}
                    style={{
                      width: stats.total > 0 
                        ? `${(priority.count / stats.total) * 100}%` 
                        : '0%',
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {stats.total > 0 
                    ? Math.round((priority.count / stats.total) * 100) 
                    : 0}%
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
