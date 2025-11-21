import { Article } from 'src/app/models/Article';
import { themeMock } from './themeMock';

export const articleMock: Article = {
  id: 1,
  title: 'Repenser la présence numérique : un enjeu stratégique',
  content: `Dans un paysage numérique qui évolue à une vitesse impressionnante, les entreprises se voient confrontées à un défi majeur : offrir des expériences en ligne qui soient à la fois fluides, cohérentes et adaptées aux nouvelles attentes des utilisateurs.\n
Aujourd’hui, la majorité des interactions avec une marque passent par une interface digitale. Qu’il s’agisse d’une simple recherche d’information, d’un achat ou d’un parcours de souscription plus complexe, chaque détail de l’application web influence la perception globale de l’utilisateur.\n
Pourtant, beaucoup d’applications encore en service reposent sur des architectures datées, accumulent de la dette technique et peinent à évoluer. Les conséquences sont visibles : temps de chargement élevés, interactions lentes, parcours utilisateurs confus et frustrations répétées.\n
Moderniser une application web n’est pas qu’une histoire de technologie. C’est un processus qui implique de repenser l’organisation interne, de revoir les priorités métier et, surtout, de replacer l’utilisateur au centre des décisions. Une interface rapide et simple n’est pas un “plus”, c’est un standard auquel se comparent désormais toutes les autres.\n
Les entreprises qui investissent dans cette transformation constatent rapidement les bénéfices : amélioration de la satisfaction client, simplification du travail des équipes, réduction des coûts de maintenance et capacité accrue à innover. En d'autres termes, moderniser le web, c’est moderniser l’entreprise elle-même.\n
À l’heure où la concurrence se joue parfois à quelques secondes de chargement ou à un parcours légèrement plus intuitif, prendre soin de sa présence numérique n’a jamais été aussi crucial.`,
  author: 'Thomas Lebel',
  createdAt: new Date('2024-05-21T14:30:00'),
  updatedAt: new Date('2024-11-14T13:00:00'),
  theme: themeMock,
};
