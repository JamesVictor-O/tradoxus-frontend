'use client';

import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function I18nDemoPage() {
  const { t, currentLanguage, changeLanguage } = useTranslation();

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.welcome')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('common.loading')} - {t('common.success')} - {t('common.error')}
          </p>
          <Badge variant="secondary" className="text-sm">
            Current Language: {currentLanguage.toUpperCase()}
          </Badge>
        </div>

        {/* Language Switcher */}
        <Card>
          <CardHeader>
            <CardTitle>{t('common.language')}</CardTitle>
            <CardDescription>
              {t('common.select')} {t('common.language').toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button
                variant={currentLanguage === 'en' ? 'default' : 'outline'}
                onClick={() => handleLanguageChange('en')}
              >
                🇺🇸 English
              </Button>
              <Button
                variant={currentLanguage === 'es' ? 'default' : 'outline'}
                onClick={() => handleLanguageChange('es')}
              >
                🇪🇸 Español
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Examples */}
        <Card>
          <CardHeader>
            <CardTitle>{t('navigation.navigation')}</CardTitle>
            <CardDescription>
              {t('common.examples')} {t('navigation.navigation').toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Badge variant="outline" className="text-center py-2">
                {t('navigation.home')}
              </Badge>
              <Badge variant="outline" className="text-center py-2">
                {t('navigation.dashboard')}
              </Badge>
              <Badge variant="outline" className="text-center py-2">
                {t('navigation.trading')}
              </Badge>
              <Badge variant="outline" className="text-center py-2">
                {t('navigation.education')}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Trading Examples */}
        <Card>
          <CardHeader>
            <CardTitle>{t('trading.trading')}</CardTitle>
            <CardDescription>
              {t('common.examples')} {t('trading.trading').toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Badge variant="outline">{t('trading.buy')}</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('trading.placeOrder')}
                </p>
              </div>
              <div className="space-y-2">
                <Badge variant="outline">{t('trading.sell')}</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('trading.cancelOrder')}
                </p>
              </div>
              <div className="space-y-2">
                <Badge variant="outline">{t('trading.orderType')}</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('trading.market')} / {t('trading.limit')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Examples */}
        <Card>
          <CardHeader>
            <CardTitle>{t('portfolio.portfolio')}</CardTitle>
            <CardDescription>
              {t('common.examples')} {t('portfolio.portfolio').toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {t('portfolio.portfolioValue')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  $10,000
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {t('portfolio.totalProfit')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  +$500
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {t('portfolio.winRate')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  75%
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {t('portfolio.totalTrades')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  24
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education Examples */}
        <Card>
          <CardHeader>
            <CardTitle>{t('education.education')}</CardTitle>
            <CardDescription>
              {t('common.examples')} {t('education.education').toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Badge variant="outline">{t('education.courses')}</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('education.startLearning')}
                </p>
              </div>
              <div className="space-y-2">
                <Badge variant="outline">{t('education.lessons')}</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('education.continueLearning')}
                </p>
              </div>
              <div className="space-y-2">
                <Badge variant="outline">{t('education.progress')}</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('education.inProgress')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Examples */}
        <Card>
          <CardHeader>
            <CardTitle>{t('errors.error')}</CardTitle>
            <CardDescription>
              {t('common.examples')} {t('errors.error').toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200">
                  {t('errors.networkError')}
                </p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200">
                  {t('errors.validationError')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 