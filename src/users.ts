import logo from './assets/logo-no-text.png';
import morel from './assets/morel.webp';
import caleb from './assets/caleb.jpg';
import demar from './assets/demar.webp';

export const CURRENT_USER = {
  avatarImgUrl: logo,
  name: 'Sleeper User',
};

export const OTHER_USERS = [
  {
    avatarImgUrl: morel,
    name: 'Christopher Morel',
    possibleMessages: [
      'Go Cubs Go!',
      'Watch me hit a home run!',
      'The Cubs are going to win the NL Central.',
      'Beat St. Louis!',
      'I have the most homers on the Cubs.',
      'Jed Hoyer is the best executive in baseball.',
      'Hey Chicago, waddaya say? The Cubs are gonna win today!',
    ],
  },
  {
    avatarImgUrl: caleb,
    name: 'Caleb Williams',
    possibleMessages: [
      'Bear down!',
      'Who should I throw my first TD to? Keenan Allen? DJ Moore? Rome Odunze?',
      'No Bears QB has ever thrown for 4000 yards (lol).',
      'Beat Green Bay!',
      'Ryan Poles is my GM!',
      'The new stadium is going to be awesome!',
      'Time to put Chicago back on the map!',
      'DeAndre Swift better be ready to catch passes from me.',
    ],
  },
  {
    avatarImgUrl: demar,
    name: 'DeMar DeRozan',
    possibleMessages: [
      'Go Bulls! (seriously though, help me)',
      'Wanna see me score 40 points in a loss?',
      'My midrange jumper is automatic!',
      'Jerry Reinsdorf is the best owner in sports! /s',
      'Please trade me!',
      'We made the play-in game this year!',
    ],
  },
];
