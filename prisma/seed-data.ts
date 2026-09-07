export const profileSeed = {
  name: 'Profile 1',
  description: 'Profile description placeholder.',
  projects: [
    {
      name: 'Project 1',
      link: {
        name: 'Project 1 link',
        url: 'https://example.com/project-1',
      },
    },
    {
      name: 'Project 2',
      link: {
        name: 'Project 2 link',
        url: 'https://example.com/project-2',
      },
    },
  ],
  experiences: [
    {
      company: 'Company 1',
      position: 'Position 1',
      startedAt: new Date('2020-01-01'),
      endedAt: new Date('2022-01-01'),
      achievements: 'Achievement 1',
    },
    {
      company: 'Company 2',
      position: 'Position 2',
      startedAt: new Date('2022-02-01'),
      endedAt: new Date('2024-02-01'),
      achievements: 'Achievement 2',
    },
  ],
  links: [
    { name: 'Profile link 1', url: 'https://example.com/profile-1' },
    { name: 'Profile link 2', url: 'https://example.com/profile-2' },
  ],
  skills: ['Skill 1', 'Skill 2'],
};
