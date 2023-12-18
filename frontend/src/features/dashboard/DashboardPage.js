import { useTranslation } from 'react-i18next';

import MainPage from 'app/MainPage';

function DashboardPage() {
  const { t } = useTranslation();

  return <MainPage id="dashboard-page" title={t('nav.dashboard')}></MainPage>;
}

export default DashboardPage;
