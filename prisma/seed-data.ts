export const profileSeed = {
  name: 'Кусков Дмитрий',
  description:
    'Fullstack Developer с сильной экспертизой во frontend и фокусом на развитии в backend',

  links: [
    { name: 'GitHub', url: 'https://github.com/dkskv' },
    { name: 'LeetCode', url: 'https://leetcode.com/dkskv' },
  ],

  skills: ['TypeScript', 'React', 'NestJS', 'GraphQL', 'PostgreSQL', 'Docker'],

  projects: [
    {
      name: 'Конструктор BI-приложений',
      link: {
        name: 'Сайт продукта',
        url: 'https://infomaximum.ru/product',
      },
    },
    {
      name: 'JS-трекер пользовательской активности',
      link: {
        name: 'Сайт продукта',
        url: 'https://infomaximum.ru/product',
      },
    },
    {
      name: 'Система учета рабочего времени Timesheet',
      link: {
        name: 'Сайт продукта',
        url: 'https://infomaximum.ru/product',
      },
    },
    {
      name: 'Развитие open source SDK',
      link: {
        name: 'Ссылка',
        url: 'https://github.com/Infomaximum/widget-sdk',
      },
    },
    {
      name: 'Система инвентаризации (NestJS + GraphQL + TypeORM)',
      link: {
        name: 'Pet-проект',
        url: 'https://github.com/dkskv/inventory',
      },
    },
    {
      name: 'Backend сайта строительной компании (Express + Google sheets)',
      link: {
        name: 'Pet-проект',
        url: 'https://github.com/dkskv/construction-works-backend',
      },
    },
  ],

  experiences: [
    {
      company: 'Инфомаксимум',
      position: 'Frontend-разработчик',
      startedAt: new Date('2019-09-01'),
      endedAt: new Date('2023-04-01'),
      achievements:
        'Разрабатывал B2B-продукты для крупных корпоративных клиентов',
    },
    {
      company: 'Инфомаксимум',
      position: 'Лидер команды Frontend-разработки',
      startedAt: new Date('2023-05-01'),
      endedAt: new Date('2026-05-01'),
      achievements:
        'Технически лидировал frontend-команду и проектировал масштабируемую архитектуру React/TypeScript-продуктов',
    },
    {
      company: '—',
      position: 'Backend/fullstack разработчик',
      startedAt: new Date('2026-06-01'),
      endedAt: null,
      achievements: 'Развиваю backend-компетенции',
    },
  ],
};
