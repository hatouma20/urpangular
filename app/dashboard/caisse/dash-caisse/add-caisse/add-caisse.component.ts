import {Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {CompteTypeEnum} from '../../../../shared/model/enum-type/Caisse/compte-type-enum';
import {CompteFinanceRequestForm} from '../../../../shared/model/request-payload/caisse/compte-finance-form';
import {CompteResult} from '../../../../shared/model/response-payload/caisse/compte-result';
import {CurrencyResult} from '../../../../shared/model/response-payload/caisse/currency-result';
import {CaisseService} from '../../../../shared/services/back-end/caisse/caisse.service';
import {Subject} from 'rxjs';
@Component({
  selector: 'wind-add-caisse',
  templateUrl: './add-caisse.component.html',
  styleUrls: ['./add-caisse.component.scss']
})
export class AddCaisseComponent implements OnInit {
  currencies: Array<CurrencyResult>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  comptecomptablelist = [
    { id: 1, label: '1 - Fonds propres  provisions pour risques et char' },
    { id: 10, label: ' 10 - Capital et réserves'},
    { id: 101, label: '101 - Capital' },
    { id: 104, label: '104 - Primes liées au capital social' },
    { id: 105, label: '105 - Ecarts de réévaluation' },
    { id: 106, label: '106 - Réserves' },
    { id: 107, label: '107 - Ecart d\'equivalence' },
    { id: 108, label: '108 - Compte de l\'exploitant' },
    { id: 109, label: '109 - Actionnaires : capital souscrit - non appelé' },
    { id: 11, label: '11 - Report à nouveau (solde créditeur ou débiteur)' },
    { id: 110, label: '110 - Report à nouveau (solde créditeur)' },
    { id: 119, label: '119 - Report à nouveau (solde débiteur)' },
    { id: 12, label: '12 - Résultat de l\'exercice (bénéfice ou perte)' },
    { id: 120, label: '120 - Résultat de l\'exercice (bénéfice)' },
    { id: 129, label: '129 - Résultat de l exercice perte' },
    { id: 13, label: '13 - Subventions d investissement'},
    { id: 13, label: '13 - Subventions d investissement'},
    { id: 131, label: '131 - Subventions d équipement'},
    { id: 138, label: '138 - Autres subventions d investissement'},
    { id: 139, label: '139 - Subventions d \'investissement inscrites au co...'},
    { id: 14, label: '14 - Provisions réglementées'},
    { id: 142, label: '142 - Provisions réglementées relatives aux immobi...'},
    { id: 143, label: '143 - Provisions réglementées relatives aux stocks'}
  ];
  codecomptablelist = [
    { id: 1, label: 'BQ - Bank journal' }
  ];
  listcountries = [
    {
      id: 4,
      name: 'Afghanistan',
      alpha2: 'af',
      alpha3: 'afg'
    },
    {
      id: 710,
      name: 'Afrique du Sud',
      alpha2: 'za',
      alpha3: 'zaf'
    },
    {
      id: 8,
      name: 'Albanie',
      alpha2: 'al',
      alpha3: 'alb'
    },
    {
      id: 12,
      name: 'Algérie',
      alpha2: 'dz',
      alpha3: 'dza'
    },
    {
      id: 276,
      name: 'Allemagne',
      alpha2: 'de',
      alpha3: 'deu'
    },
    {
      id: 20,
      name: 'Andorre',
      alpha2: 'ad',
      alpha3: 'and'
    },
    {
      id: 24,
      name: 'Angola',
      alpha2: 'ao',
      alpha3: 'ago'
    },
    {
      id: 28,
      name: 'Antigua-et-Barbuda',
      alpha2: 'ag',
      alpha3: 'atg'
    },
    {
      id: 682,
      name: 'Arabie saoudite',
      alpha2: 'sa',
      alpha3: 'sau'
    },
    {
      id: 32,
      name: 'Argentine',
      alpha2: 'ar',
      alpha3: 'arg'
    },
    {
      id: 51,
      name: 'Arménie',
      alpha2: 'am',
      alpha3: 'arm'
    },
    {
      id: 36,
      name: 'Australie',
      alpha2: 'au',
      alpha3: 'aus'
    },
    {
      id: 40,
      name: 'Autriche',
      alpha2: 'at',
      alpha3: 'aut'
    },
    {
      id: 31,
      name: 'Azerbaïdjan',
      alpha2: 'az',
      alpha3: 'aze'
    },
    {
      id: 44,
      name: 'Bahamas',
      alpha2: 'bs',
      alpha3: 'bhs'
    },
    {
      id: 48,
      name: 'Bahreïn',
      alpha2: 'bh',
      alpha3: 'bhr'
    },
    {
      id: 50,
      name: 'Bangladesh',
      alpha2: 'bd',
      alpha3: 'bgd'
    },
    {
      id: 52,
      name: 'Barbade',
      alpha2: 'bb',
      alpha3: 'brb'
    },
    {
      id: 112,
      name: 'Biélorussie',
      alpha2: 'by',
      alpha3: 'blr'
    },
    {
      id: 56,
      name: 'Belgique',
      alpha2: 'be',
      alpha3: 'bel'
    },
    {
      id: 84,
      name: 'Belize',
      alpha2: 'bz',
      alpha3: 'blz'
    },
    {
      id: 204,
      name: 'Bénin',
      alpha2: 'bj',
      alpha3: 'ben'
    },
    {
      id: 64,
      name: 'Bhoutan',
      alpha2: 'bt',
      alpha3: 'btn'
    },
    {
      id: 68,
      name: 'Bolivie',
      alpha2: 'bo',
      alpha3: 'bol'
    },
    {
      id: 70,
      name: 'Bosnie-Herzégovine',
      alpha2: 'ba',
      alpha3: 'bih'
    },
    {
      id: 72,
      name: 'Botswana',
      alpha2: 'bw',
      alpha3: 'bwa'
    },
    {
      id: 76,
      name: 'Brésil',
      alpha2: 'br',
      alpha3: 'bra'
    },
    {
      id: 96,
      name: 'Brunei',
      alpha2: 'bn',
      alpha3: 'brn'
    },
    {
      id: 100,
      name: 'Bulgarie',
      alpha2: 'bg',
      alpha3: 'bgr'
    },
    {
      id: 854,
      name: 'Burkina Faso',
      alpha2: 'bf',
      alpha3: 'bfa'
    },
    {
      id: 108,
      name: 'Burundi',
      alpha2: 'bi',
      alpha3: 'bdi'
    },
    {
      id: 116,
      name: 'Cambodge',
      alpha2: 'kh',
      alpha3: 'khm'
    },
    {
      id: 120,
      name: 'Cameroun',
      alpha2: 'cm',
      alpha3: 'cmr'
    },
    {
      id: 124,
      name: 'Canada',
      alpha2: 'ca',
      alpha3: 'can'
    },
    {
      id: 132,
      name: 'Cap-Vert',
      alpha2: 'cv',
      alpha3: 'cpv'
    },
    {
      id: 140,
      name: 'République centrafricaine',
      alpha2: 'cf',
      alpha3: 'caf'
    },
    {
      id: 152,
      name: 'Chili',
      alpha2: 'cl',
      alpha3: 'chl'
    },
    {
      id: 156,
      name: 'Chine',
      alpha2: 'cn',
      alpha3: 'chn'
    },
    {
      id: 196,
      name: 'Chypre (pays)',
      alpha2: 'cy',
      alpha3: 'cyp'
    },
    {
      id: 170,
      name: 'Colombie',
      alpha2: 'co',
      alpha3: 'col'
    },
    {
      id: 174,
      name: 'Comores (pays)',
      alpha2: 'km',
      alpha3: 'com'
    },
    {
      id: 178,
      name: 'République du Congo',
      alpha2: 'cg',
      alpha3: 'cog'
    },
    {
      id: 180,
      name: 'République démocratique du Congo',
      alpha2: 'cd',
      alpha3: 'cod'
    },
    {
      id: 410,
      name: 'Corée du Sud',
      alpha2: 'kr',
      alpha3: 'kor'
    },
    {
      id: 408,
      name: 'Corée du Nord',
      alpha2: 'kp',
      alpha3: 'prk'
    },
    {
      id: 188,
      name: 'Costa Rica',
      alpha2: 'cr',
      alpha3: 'cri'
    },
    {
      id: 384,
      name: 'Côte d\'Ivoire',
      alpha2: 'ci',
      alpha3: 'civ'
    },
    {
      id: 191,
      name: 'Croatie',
      alpha2: 'hr',
      alpha3: 'hrv'
    },
    {
      id: 192,
      name: 'Cuba',
      alpha2: 'cu',
      alpha3: 'cub'
    },
    {
      id: 208,
      name: 'Danemark',
      alpha2: 'dk',
      alpha3: 'dnk'
    },
    {
      id: 262,
      name: 'Djibouti',
      alpha2: 'dj',
      alpha3: 'dji'
    },
    {
      id: 214,
      name: 'République dominicaine',
      alpha2: 'do',
      alpha3: 'dom'
    },
    {
      id: 212,
      name: 'Dominique',
      alpha2: 'dm',
      alpha3: 'dma'
    },
    {
      id: 818,
      name: 'Égypte',
      alpha2: 'eg',
      alpha3: 'egy'
    },
    {
      id: 222,
      name: 'Salvador',
      alpha2: 'sv',
      alpha3: 'slv'
    },
    {
      id: 784,
      name: 'Émirats arabes unis',
      alpha2: 'ae',
      alpha3: 'are'
    },
    {
      id: 218,
      name: 'Équateur (pays)',
      alpha2: 'ec',
      alpha3: 'ecu'
    },
    {
      id: 232,
      name: 'Érythrée',
      alpha2: 'er',
      alpha3: 'eri'
    },
    {
      id: 724,
      name: 'Espagne',
      alpha2: 'es',
      alpha3: 'esp'
    },
    {
      id: 233,
      name: 'Estonie',
      alpha2: 'ee',
      alpha3: 'est'
    },
    {
      id: 840,
      name: 'États-Unis',
      alpha2: 'us',
      alpha3: 'usa'
    },
    {
      id: 231,
      name: 'Éthiopie',
      alpha2: 'et',
      alpha3: 'eth'
    },
    {
      id: 242,
      name: 'Fidji',
      alpha2: 'fj',
      alpha3: 'fji'
    },
    {
      id: 246,
      name: 'Finlande',
      alpha2: 'fi',
      alpha3: 'fin'
    },
    {
      id: 250,
      name: 'France',
      alpha2: 'fr',
      alpha3: 'fra'
    },
    {
      id: 266,
      name: 'Gabon',
      alpha2: 'ga',
      alpha3: 'gab'
    },
    {
      id: 270,
      name: 'Gambie',
      alpha2: 'gm',
      alpha3: 'gmb'
    },
    {
      id: 268,
      name: 'Géorgie (pays)',
      alpha2: 'ge',
      alpha3: 'geo'
    },
    {
      id: 288,
      name: 'Ghana',
      alpha2: 'gh',
      alpha3: 'gha'
    },
    {
      id: 300,
      name: 'Grèce',
      alpha2: 'gr',
      alpha3: 'grc'
    },
    {
      id: 308,
      name: 'Grenade (pays)',
      alpha2: 'gd',
      alpha3: 'grd'
    },
    {
      id: 320,
      name: 'Guatemala',
      alpha2: 'gt',
      alpha3: 'gtm'
    },
    {
      id: 324,
      name: 'Guinée',
      alpha2: 'gn',
      alpha3: 'gin'
    },
    {
      id: 624,
      name: 'Guinée-Bissau',
      alpha2: 'gw',
      alpha3: 'gnb'
    },
    {
      id: 226,
      name: 'Guinée équatoriale',
      alpha2: 'gq',
      alpha3: 'gnq'
    },
    {
      id: 328,
      name: 'Guyana',
      alpha2: 'gy',
      alpha3: 'guy'
    },
    {
      id: 332,
      name: 'Haïti',
      alpha2: 'ht',
      alpha3: 'hti'
    },
    {
      id: 340,
      name: 'Honduras',
      alpha2: 'hn',
      alpha3: 'hnd'
    },
    {
      id: 348,
      name: 'Hongrie',
      alpha2: 'hu',
      alpha3: 'hun'
    },
    {
      id: 356,
      name: 'Inde',
      alpha2: 'in',
      alpha3: 'ind'
    },
    {
      id: 360,
      name: 'Indonésie',
      alpha2: 'id',
      alpha3: 'idn'
    },
    {
      id: 364,
      name: 'Iran',
      alpha2: 'ir',
      alpha3: 'irn'
    },
    {
      id: 368,
      name: 'Irak',
      alpha2: 'iq',
      alpha3: 'irq'
    },
    {
      id: 372,
      name: 'Irlande (pays)',
      alpha2: 'ie',
      alpha3: 'irl'
    },
    {
      id: 352,
      name: 'Islande',
      alpha2: 'is',
      alpha3: 'isl'
    },
    {
      id: 376,
      name: 'Israël',
      alpha2: 'il',
      alpha3: 'isr'
    },
    {
      id: 380,
      name: 'Italie',
      alpha2: 'it',
      alpha3: 'ita'
    },
    {
      id: 388,
      name: 'Jamaïque',
      alpha2: 'jm',
      alpha3: 'jam'
    },
    {
      id: 392,
      name: 'Japon',
      alpha2: 'jp',
      alpha3: 'jpn'
    },
    {
      id: 400,
      name: 'Jordanie',
      alpha2: 'jo',
      alpha3: 'jor'
    },
    {
      id: 398,
      name: 'Kazakhstan',
      alpha2: 'kz',
      alpha3: 'kaz'
    },
    {
      id: 404,
      name: 'Kenya',
      alpha2: 'ke',
      alpha3: 'ken'
    },
    {
      id: 417,
      name: 'Kirghizistan',
      alpha2: 'kg',
      alpha3: 'kgz'
    },
    {
      id: 296,
      name: 'Kiribati',
      alpha2: 'ki',
      alpha3: 'kir'
    },
    {
      id: 414,
      name: 'Koweït',
      alpha2: 'kw',
      alpha3: 'kwt'
    },
    {
      id: 418,
      name: 'Laos',
      alpha2: 'la',
      alpha3: 'lao'
    },
    {
      id: 426,
      name: 'Lesotho',
      alpha2: 'ls',
      alpha3: 'lso'
    },
    {
      id: 428,
      name: 'Lettonie',
      alpha2: 'lv',
      alpha3: 'lva'
    },
    {
      id: 422,
      name: 'Liban',
      alpha2: 'lb',
      alpha3: 'lbn'
    },
    {
      id: 430,
      name: 'Liberia',
      alpha2: 'lr',
      alpha3: 'lbr'
    },
    {
      id: 434,
      name: 'Libye',
      alpha2: 'ly',
      alpha3: 'lby'
    },
    {
      id: 438,
      name: 'Liechtenstein',
      alpha2: 'li',
      alpha3: 'lie'
    },
    {
      id: 440,
      name: 'Lituanie',
      alpha2: 'lt',
      alpha3: 'ltu'
    },
    {
      id: 442,
      name: 'Luxembourg (pays)',
      alpha2: 'lu',
      alpha3: 'lux'
    },
    {
      id: 807,
      name: 'Macédoine du Nord',
      alpha2: 'mk',
      alpha3: 'mkd'
    },
    {
      id: 450,
      name: 'Madagascar',
      alpha2: 'mg',
      alpha3: 'mdg'
    },
    {
      id: 458,
      name: 'Malaisie',
      alpha2: 'my',
      alpha3: 'mys'
    },
    {
      id: 454,
      name: 'Malawi',
      alpha2: 'mw',
      alpha3: 'mwi'
    },
    {
      id: 462,
      name: 'Maldives',
      alpha2: 'mv',
      alpha3: 'mdv'
    },
    {
      id: 466,
      name: 'Mali',
      alpha2: 'ml',
      alpha3: 'mli'
    },
    {
      id: 470,
      name: 'Malte',
      alpha2: 'mt',
      alpha3: 'mlt'
    },
    {
      id: 504,
      name: 'Maroc',
      alpha2: 'ma',
      alpha3: 'mar'
    },
    {
      id: 584,
      name: 'Îles Marshall (pays)',
      alpha2: 'mh',
      alpha3: 'mhl'
    },
    {
      id: 480,
      name: 'Maurice (pays)',
      alpha2: 'mu',
      alpha3: 'mus'
    },
    {
      id: 478,
      name: 'Mauritanie',
      alpha2: 'mr',
      alpha3: 'mrt'
    },
    {
      id: 484,
      name: 'Mexique',
      alpha2: 'mx',
      alpha3: 'mex'
    },
    {
      id: 583,
      name: 'États fédérés de Micronésie (pays)',
      alpha2: 'fm',
      alpha3: 'fsm'
    },
    {
      id: 498,
      name: 'Moldavie',
      alpha2: 'md',
      alpha3: 'mda'
    },
    {
      id: 492,
      name: 'Monaco',
      alpha2: 'mc',
      alpha3: 'mco'
    },
    {
      id: 496,
      name: 'Mongolie',
      alpha2: 'mn',
      alpha3: 'mng'
    },
    {
      id: 499,
      name: 'Monténégro',
      alpha2: 'me',
      alpha3: 'mne'
    },
    {
      id: 508,
      name: 'Mozambique',
      alpha2: 'mz',
      alpha3: 'moz'
    },
    {
      id: 104,
      name: 'Birmanie',
      alpha2: 'mm',
      alpha3: 'mmr'
    },
    {
      id: 516,
      name: 'Namibie',
      alpha2: 'na',
      alpha3: 'nam'
    },
    {
      id: 520,
      name: 'Nauru',
      alpha2: 'nr',
      alpha3: 'nru'
    },
    {
      id: 524,
      name: 'Népal',
      alpha2: 'np',
      alpha3: 'npl'
    },
    {
      id: 558,
      name: 'Nicaragua',
      alpha2: 'ni',
      alpha3: 'nic'
    },
    {
      id: 562,
      name: 'Niger',
      alpha2: 'ne',
      alpha3: 'ner'
    },
    {
      id: 566,
      name: 'Nigeria',
      alpha2: 'ng',
      alpha3: 'nga'
    },
    {
      id: 578,
      name: 'Norvège',
      alpha2: 'no',
      alpha3: 'nor'
    },
    {
      id: 554,
      name: 'Nouvelle-Zélande',
      alpha2: 'nz',
      alpha3: 'nzl'
    },
    {
      id: 512,
      name: 'Oman',
      alpha2: 'om',
      alpha3: 'omn'
    },
    {
      id: 800,
      name: 'Ouganda',
      alpha2: 'ug',
      alpha3: 'uga'
    },
    {
      id: 860,
      name: 'Ouzbékistan',
      alpha2: 'uz',
      alpha3: 'uzb'
    },
    {
      id: 586,
      name: 'Pakistan',
      alpha2: 'pk',
      alpha3: 'pak'
    },
    {
      id: 585,
      name: 'Palaos',
      alpha2: 'pw',
      alpha3: 'plw'
    },
    {
      id: 591,
      name: 'Panama',
      alpha2: 'pa',
      alpha3: 'pan'
    },
    {
      id: 598,
      name: 'Papouasie-Nouvelle-Guinée',
      alpha2: 'pg',
      alpha3: 'png'
    },
    {
      id: 600,
      name: 'Paraguay',
      alpha2: 'py',
      alpha3: 'pry'
    },
    {
      id: 528,
      name: 'Pays-Bas',
      alpha2: 'nl',
      alpha3: 'nld'
    },
    {
      id: 604,
      name: 'Pérou',
      alpha2: 'pe',
      alpha3: 'per'
    },
    {
      id: 608,
      name: 'Philippines',
      alpha2: 'ph',
      alpha3: 'phl'
    },
    {
      id: 616,
      name: 'Pologne',
      alpha2: 'pl',
      alpha3: 'pol'
    },
    {
      id: 620,
      name: 'Portugal',
      alpha2: 'pt',
      alpha3: 'prt'
    },
    {
      id: 634,
      name: 'Qatar',
      alpha2: 'qa',
      alpha3: 'qat'
    },
    {
      id: 642,
      name: 'Roumanie',
      alpha2: 'ro',
      alpha3: 'rou'
    },
    {
      id: 826,
      name: 'Royaume-Uni',
      alpha2: 'gb',
      alpha3: 'gbr'
    },
    {
      id: 643,
      name: 'Russie',
      alpha2: 'ru',
      alpha3: 'rus'
    },
    {
      id: 646,
      name: 'Rwanda',
      alpha2: 'rw',
      alpha3: 'rwa'
    },
    {
      id: 659,
      name: 'Saint-Christophe-et-Niévès',
      alpha2: 'kn',
      alpha3: 'kna'
    },
    {
      id: 674,
      name: 'Saint-Marin',
      alpha2: 'sm',
      alpha3: 'smr'
    },
    {
      id: 670,
      name: 'Saint-Vincent-et-les-Grenadines',
      alpha2: 'vc',
      alpha3: 'vct'
    },
    {
      id: 662,
      name: 'Sainte-Lucie',
      alpha2: 'lc',
      alpha3: 'lca'
    },
    {
      id: 90,
      name: 'Salomon',
      alpha2: 'sb',
      alpha3: 'slb'
    },
    {
      id: 882,
      name: 'Samoa',
      alpha2: 'ws',
      alpha3: 'wsm'
    },
    {
      id: 678,
      name: 'Sao Tomé-et-Principe',
      alpha2: 'st',
      alpha3: 'stp'
    },
    {
      id: 686,
      name: 'Sénégal',
      alpha2: 'sn',
      alpha3: 'sen'
    },
    {
      id: 688,
      name: 'Serbie',
      alpha2: 'rs',
      alpha3: 'srb'
    },
    {
      id: 690,
      name: 'Seychelles',
      alpha2: 'sc',
      alpha3: 'syc'
    },
    {
      id: 694,
      name: 'Sierra Leone',
      alpha2: 'sl',
      alpha3: 'sle'
    },
    {
      id: 702,
      name: 'Singapour',
      alpha2: 'sg',
      alpha3: 'sgp'
    },
    {
      id: 703,
      name: 'Slovaquie',
      alpha2: 'sk',
      alpha3: 'svk'
    },
    {
      id: 705,
      name: 'Slovénie',
      alpha2: 'si',
      alpha3: 'svn'
    },
    {
      id: 706,
      name: 'Somalie',
      alpha2: 'so',
      alpha3: 'som'
    },
    {
      id: 729,
      name: 'Soudan',
      alpha2: 'sd',
      alpha3: 'sdn'
    },
    {
      id: 728,
      name: 'Soudan du Sud',
      alpha2: 'ss',
      alpha3: 'ssd'
    },
    {
      id: 144,
      name: 'Sri Lanka',
      alpha2: 'lk',
      alpha3: 'lka'
    },
    {
      id: 752,
      name: 'Suède',
      alpha2: 'se',
      alpha3: 'swe'
    },
    {
      id: 756,
      name: 'Suisse',
      alpha2: 'ch',
      alpha3: 'che'
    },
    {
      id: 740,
      name: 'Suriname',
      alpha2: 'sr',
      alpha3: 'sur'
    },
    {
      id: 748,
      name: 'Eswatini',
      alpha2: 'sz',
      alpha3: 'swz'
    },
    {
      id: 760,
      name: 'Syrie',
      alpha2: 'sy',
      alpha3: 'syr'
    },
    {
      id: 762,
      name: 'Tadjikistan',
      alpha2: 'tj',
      alpha3: 'tjk'
    },
    {
      id: 834,
      name: 'Tanzanie',
      alpha2: 'tz',
      alpha3: 'tza'
    },
    {
      id: 148,
      name: 'Tchad',
      alpha2: 'td',
      alpha3: 'tcd'
    },
    {
      id: 203,
      name: 'Tchéquie',
      alpha2: 'cz',
      alpha3: 'cze'
    },
    {
      id: 764,
      name: 'Thaïlande',
      alpha2: 'th',
      alpha3: 'tha'
    },
    {
      id: 626,
      name: 'Timor oriental',
      alpha2: 'tl',
      alpha3: 'tls'
    },
    {
      id: 768,
      name: 'Togo',
      alpha2: 'tg',
      alpha3: 'tgo'
    },
    {
      id: 776,
      name: 'Tonga',
      alpha2: 'to',
      alpha3: 'ton'
    },
    {
      id: 780,
      name: 'Trinité-et-Tobago',
      alpha2: 'tt',
      alpha3: 'tto'
    },
    {
      id: 788,
      name: 'Tunisie',
      alpha2: 'tn',
      alpha3: 'tun'
    },
    {
      id: 795,
      name: 'Turkménistan',
      alpha2: 'tm',
      alpha3: 'tkm'
    },
    {
      id: 792,
      name: 'Turquie',
      alpha2: 'tr',
      alpha3: 'tur'
    },
    {
      id: 798,
      name: 'Tuvalu',
      alpha2: 'tv',
      alpha3: 'tuv'
    },
    {
      id: 804,
      name: 'Ukraine',
      alpha2: 'ua',
      alpha3: 'ukr'
    },
    {
      id: 858,
      name: 'Uruguay',
      alpha2: 'uy',
      alpha3: 'ury'
    },
    {
      id: 548,
      name: 'Vanuatu',
      alpha2: 'vu',
      alpha3: 'vut'
    },
    {
      id: 862,
      name: 'Venezuela',
      alpha2: 've',
      alpha3: 'ven'
    },
    {
      id: 704,
      name: 'Viêt Nam',
      alpha2: 'vn',
      alpha3: 'vnm'
    },
    {
      id: 887,
      name: 'Yémen',
      alpha2: 'ye',
      alpha3: 'yem'
    },
    {
      id: 894,
      name: 'Zambie',
      alpha2: 'zm',
      alpha3: 'zmb'
    },
    {
      id: 716,
      name: 'Zimbabwe',
      alpha2: 'zw',
      alpha3: 'zwe'
    }
  ];
  selected: any;
  accountType = CompteTypeEnum;
  keytypecomptes = [];
  compteList: Array<CompteResult> = [];
  compteListcount = 0;
  dateSent: any;
  caisseForm: CompteFinanceRequestForm = new CompteFinanceRequestForm(
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    true
  );
  constructor(private caisseservice: CaisseService, private router: Router) {}
  ngOnInit(): void {
   this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.dateSent = moment().toDate();
    this.keytypecomptes = Object.keys(this.accountType).filter(k => !isNaN(Number(k)));


/**/
    this.caisseservice.getAllComptes().subscribe(response => {
      this.compteList = response;
      this.compteListcount = 1;

      this.dtTrigger.next();
        console.log('*************', this.compteList);

    }


         );
 /**/


    this.caisseservice.getAllCurrencies().subscribe(response =>
      this.currencies = response);
  }
  getselectedtype(event: any) {
    this.selected = event.target.value;
    this.caisseForm.accountType.value = this.accountType[this.selected];
  }
  getselectedstatus(event: any) {
    this.selected = event.target.value;
    this.caisseForm.state.value = this.selected;
  }
  getselectedcurrency(event: any) {
    this.selected = event.target.value;
    this.caisseForm.currency.value = this.selected;
  }
  getselectedcountry(event: any) {
    this.selected = event.target.value;
    this.caisseForm.country.value = this.selected.toUpperCase();
  }
  getselectedcomptecomtable(event: any) {
    this.selected = event.target.value;
    this.caisseForm.accountingAccount.value = this.selected.toUpperCase();
  }
  getselectedcodecomtable(event: any) {
    this.selected = event.target.value;
    this.caisseForm.accountingAccountCode.value = this.selected.toUpperCase();
  }
  onAddcompteFormSubmit() {
  this.caisseservice.parametersAddCaisse = this.caisseForm;
  this.caisseservice.addcompte().subscribe(() => {
      // this.router.navigateByUrl('/search/flights/result');
    });
  }
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.compteList[id][property] = editField;
    const currentcompte = this.compteList[id];
    this.caisseservice.ModifyCaisse(currentcompte).subscribe(response =>
      console.log(response)
    );
  }
  remove(uuid: any) {
    this.caisseservice.deletecompte(uuid).subscribe(response =>
      window.location.reload()
    );
  }
  getcompte(uuid: any) {
    this.caisseservice.getcompte(uuid).subscribe(compte => {
      this.router.navigateByUrl('/dashboard/caisse/caisse/caisseview');
      return compte;
    });
  }
  add() {}
  changeValue(id: number, property: string, event: any) {
   }
}
