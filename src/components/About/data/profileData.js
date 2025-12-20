import { useTranslation } from 'react-i18next'

//! =============== 1. 個人資訊 ===============

/**
 * Custom Hook: 提供個人基本資訊
 * @returns {object} 個人資訊 (name, title, photo)
 */
export const usePersonalInfo = () => {
  const { t } = useTranslation('about')

  return {
    name: t('personal.name'),
    title: t('personal.title'),
    photo: 'images/person/E1DCD153-172C-4B3F-8094-275BCCDF1D6C.webp'
  }
}

//! =============== 2. 摘要 ===============

/**
 * Custom Hook: 提供個人摘要
 * @returns {object} 摘要資訊 (title, paragraphs)
 */
export const useSummary = () => {
  const { t } = useTranslation('about')

  return {
    title: t('summary.title'),
    paragraphs: t('summary.paragraphs', { returnObjects: true })
  }
}

//! =============== 3. 工作經歷 ===============

/**
 * Custom Hook: 提供工作經歷
 * @returns {object} 工作經歷資訊 (title, company, position, duration, overview, achievements, technicalContributions, challenges)
 */
export const useWorkExperience = () => {
  const { t } = useTranslation('about')

  // 從物件結構轉換為陣列
  const achievementsObj = t('work.achievements', { returnObjects: true })
  const contributionsObj = t('work.contributions', { returnObjects: true })
  const challengesObj = t('work.challenges', { returnObjects: true })

  return {
    title: t('work.title'),
    company: t('work.company'),
    position: t('work.position'),
    duration: t('work.duration'),
    overview: t('work.overview'),
    achievements: [
      {
        title: achievementsObj.manufacturing.title,
        items: achievementsObj.manufacturing.items
      },
      {
        title: achievementsObj.agriculture.title,
        items: achievementsObj.agriculture.items
      }
    ],
    technicalContributions: [
      {
        title: contributionsObj.designToken.title,
        description: contributionsObj.designToken.description
      },
      {
        title: contributionsObj.typescript.title,
        description: contributionsObj.typescript.description
      },
      {
        title: contributionsObj.patterns.title,
        description: contributionsObj.patterns.description
      }
    ],
    challenges: [
      {
        title: challengesObj.design.title,
        description: challengesObj.design.description
      },
      {
        title: challengesObj.commercial.title,
        description: challengesObj.commercial.description
      }
    ]
  }
}

//! =============== 4. 技能 ===============

/**
 * Custom Hook: 提供技能資訊
 * @returns {object} 技能資訊 (title, categories, skills)
 */
export const useSkills = () => {
  const { t } = useTranslation('about')

  const skillsObj = t('skills', { returnObjects: true })

  return {
    title: skillsObj.title,
    categories: [
      { key: 'languages', title: skillsObj.languages.title },
      { key: 'frameworks', title: skillsObj.frameworks.title },
      { key: 'libraries', title: skillsObj.libraries.title },
      { key: 'tools', title: skillsObj.tools.title }
    ],
    skills: {
      languages: skillsObj.languages.items,
      frameworks: skillsObj.frameworks.items,
      libraries: skillsObj.libraries.items,
      tools: skillsObj.tools.items
    }
  }
}

//! =============== 5. 核心優勢 ===============

/**
 * Custom Hook: 提供核心優勢
 * @returns {object} 核心優勢資訊 (title, items)
 */
export const useCoreStrengths = () => {
  const { t } = useTranslation('about')

  const strengthsObj = t('strengths', { returnObjects: true })
  return {
    title: strengthsObj.title,
    items: strengthsObj.items
  }
}

