import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ROLE_ADMIN, ROLE_USER} from '../../constants/event';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  public selectedItemMenu = new BehaviorSubject(null);
  public selectedmenuShownMenu = new BehaviorSubject(null);
  menu = [
    {
      label: 'Espace RH',
      icon: 'ni ni-single-02',
      url: '#/',
      role: ROLE_USER,
      style: 'color:white !importnat',
      niveau: 1,
      children: [
        {
          label: 'Profil',
          icon: 'ni ni-single-02',
          url: '#/dashboard/employee/profile',
          role: ROLE_USER,
          style: 'color:white !importnat',
          niveau: 2,
          children: []
        },
        {
          label: 'Info Contrat',
          icon: 'ni ni-badge',
          url: '#/dashboard/employee/infocontrat',
          role: ROLE_USER,
          style: 'color:white !importnat',
          niveau: 2,
          children: []
        },
      ]
    },
    {
      label: 'Abscence & Pointage',
      icon: 'ni ni-calendar-grid-58',
      url: '#/dashboard/employee/conge',
      role: ROLE_USER,
      niveau: 1,
      children: [
        {
          label: 'Demande Congé',
          icon: '',
          url: '/#/dashboard/employee/conge/requestleave',
          role: ROLE_USER,
          niveau: 2,
          children: []
        },
        {
          label: 'Règles des Congés',
          icon: '',
          url: '#/dashboard/employee/conge/companyenabledrule',
          role: ROLE_USER,
          niveau: 2,
          children: []
        },
        {
          label: 'Jours Fériés',
          icon: '',
          url: '#/dashboard/employee/conge/companyholiday',
          role: ROLE_USER,
          niveau: 2,
          children: []
        },
        {
          label: 'Congé Autorisés par l\'entreprise',
          icon: '',
          url: '#/dashboard/employee/conge/companyenabledleave',
          role: ROLE_USER,
          niveau: 2,
          children: []
        },
      ]
    },

    {
      label: 'Espace RH',
      icon: 'ni ni-single-02',
      url: '#/dashboard/admin/profile',
      role: ROLE_ADMIN,
      niveau: 1,
      children: [
        {
          label: 'Profil',
          icon: 'ni ni-single-02',
          url: '#/dashboard/admin/profile',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
        {
          label: 'Collaborateurs',
          icon: 'ni ni-circle-08',
          url: '#/dashboard/admin/collaborators',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
        {
          label: 'Département',
          icon: '',
          url: '#/dashboard/admin/collaborators/teams',
          role: ROLE_ADMIN,
          niveau: 2,
          children: [
            {
              label: 'Gestion Département',
              icon: '',
              url: '#/dashboard/admin/collaborators/teams',
              role: ROLE_ADMIN,
              niveau: 3,
            },
            {
              label: 'Affecter département',
              icon: '',
              url: '#/dashboard/admin/collaborators/team',
              role: ROLE_ADMIN,
              niveau: 3,
            },
          ]
        },
      ]
    },
    {
      label: 'Contract',
      icon: 'ni ni-badge',
      url: '#/dashboard/admin/infocontrat/gestionduration',
      role: ROLE_ADMIN,
      niveau: 1,
      children: [
        {
          label: 'Contract Duration',
          icon: '',
          url: '#/dashboard/admin/infocontrat/gestionduration',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
        {
          label: 'Contract Type',
          icon: '',
          url: '#/dashboard/admin/infocontrat/gestiontype',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
        {
          label: 'Template de contrat',
          icon: '',
          url: '#/dashboard/admin/template',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
        // {
        //   label: 'List contr',
        //   icon: '',
        //   url: '#/dashboard/admin/infocontrat/historique',
        //   role: ROLE_ADMIN,
        //   niveau: 2,
        //   children: []
        // },
      ]
    },
    // {
    //   label: 'Info Contrat',
    //   icon: 'ni ni-badge',
    //   url: '#/dashboard/employee/infocontrat',
    //   role: ROLE_ADMIN,
    //   children: [
    //     {
    //       label: 'Gestion Contract Duration',
    //       icon: '',
    //       url: '#/dashboard/admin/infocontrat/gestionduration',
    //       role: ROLE_ADMIN,
    //     },
    //     {
    //       label: 'Gestion Contract Type',
    //       icon: '',
    //       url: '#/dashboard/admin/infocontrat/gestiontype',
    //       role: ROLE_ADMIN,
    //     },
    //   ]
    // },
    {
      label: 'Abscence & Pointage',
      icon: 'ni ni-calendar-grid-58',
      url: '#/dashboard/employee/conge',
      role: ROLE_ADMIN,
      niveau: 1,
      children: [
        {
          label: 'Demande Congé',
          icon: '',
          url: '/#/dashboard/admin/conge/requestleave',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
        {
          label: 'Historiques',
          icon: '',
          url: '#/dashboard/admin/conge/historique',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
        {
          label: 'Règles des Congés',
          icon: '',
          url: '#/dashboard/admin/conge/companyenabledrule',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
        {
          label: 'Jours Fériés',
          icon: '',
          url: '#/dashboard/admin/conge/companyholiday',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
        {
          label: 'Congé Autorisés par l\'entreprise',
          icon: '',
          url: '#/dashboard/admin/conge/companyenabledleave',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
        {
          label: 'Pointage',
          icon: '',
          url: '#/dashboard/admin/conge/pointage',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
      ]
    },
    // {
    //   label: 'Fiche de paie',
    //   icon: 'ni ni-badge',
    //   url: '#/dashboard/admin/conge/fichedepaie',
    //   role: ROLE_ADMIN,
    //   niveau: 2,
    //   children: []
    // },


    {
      label: 'Facturation',
      icon: 'ni ni-single-copy-04',
      url: '',
      role: ROLE_ADMIN,
      niveau: 1,
      children: [
        {
          label: 'Factures entrantes',
          icon: 'ni ni-settings-gear-65',
          url: '#/dashboard/admin/facture/stepper',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
        {
          label: 'Factures sortantes',
          icon: '',
          url: '#/dashboard/admin/facture/factureSortante',
          role: ROLE_ADMIN,
          niveau: 2,
          children: [
            {
              label: 'Commande fournisseur',
              icon: 'ni ni-settings-gear-65',
              url: '#/dashboard/admin/facture/commandefournisseur',
              role: ROLE_ADMIN,
              niveau: 3,
            },
            {
              label: 'Bon Reception',
              icon: '',
              url: '#/dashboard/admin/facture/bonReception',
              role: ROLE_ADMIN,
              niveau: 3,
            },
            {
              label: 'Factures Fournisseur',
              icon: '',
              url: '#/dashboard/admin/facture/facturefournisseur',
              role: ROLE_ADMIN,
              niveau: 3,
            }
          ]
        }
      ]
    },
    {
      label: 'Paramètre',
      icon: 'ni ni-settings-gear-65',
      url: '',
      role: ROLE_ADMIN,
      niveau: 1,
      children: [
        {
          label: 'Fiche de Paie',
          icon: 'ni ni-settings-gear-65',
          url: '#/dashboard/admin/payroll',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
        // {
        //   label: '',
        //   icon: '',
        //   url: '',
        //   role: ROLE_ADMIN,
        //   niveau: 2,
        //   children: []
        // }
      ]
    },
    // {
    //   label: 'Notes',
    //   icon: 'ni ni-bullet-list-67',
    //   url: '#/dashboard/admin/notes',
    //   role: ROLE_ADMIN,
    //   niveau: 1,
    //   children: []
    // },
    // {
    //   label: 'Documents',
    //   icon: 'ni ni-single-copy-04',
    //   url: '#/dashboard/admin/document',
    //   role: ROLE_ADMIN,
    //   niveau: 1,
    //   children: []
    // },
    // {
    //   label: 'Notes',
    //   icon: 'ni ni-bullet-list-67',
    //   url: '#/dashboard/admin/notes',
    //   role: ROLE_ADMIN,
    //   niveau: 1,
    //   children: []
    // },
    {
      label: 'Fournisseurs',
      icon: 'ni ni-building',
      url: '#/dashboard/employee/conge',
      role: ROLE_ADMIN,
      niveau: 1,
      children: [
        {
          label: 'Ajout Fournisseur',
          icon: '',
          url: '#/dashboard/fournisseur/fournisseur',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
        {
          label: 'List Fournisseurs',
          icon: '',
          url: '#/dashboard/fournisseur/fournisseur/list',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
      ]
    },
    {
      label: 'Projets',
      icon: 'fa fa-list-alt',
      url: '',
      role: ROLE_ADMIN,
      niveau: 1,
      children: [
        {
          label: 'Ajout Projet',
          icon: '',
          url: '#/dashboard/project/project',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
        {
          label: 'List Projets',
          icon: '',
          url: '#/dashboard/project/project/list',
          role: ROLE_ADMIN,
          niveau: 2,
          children: []
        },
      ]
    },

    // {
    //   label: 'Caisses',
    //   icon: 'ni ni-cart',
    //   url: '#/dashboard/caisse/caisse',
    //   role: ROLE_ADMIN,
    //   niveau: 1,
    //   children: [
    //     {
    //       label: 'Comptes Bancaires',
    //       icon: '',
    //       url: '#/dashboard/caisse/caisse',
    //       role: ROLE_ADMIN,
    //       niveau: 2,
    //       children: []
    //     },
    //     {
    //       label: 'Virements Internes',
    //       icon: '',
    //       url: '#/dashboard/caisse/caisse/virement',
    //       role: ROLE_ADMIN,
    //       niveau: 2,
    //       children: []
    //     },
    //     {
    //       label: 'Liste des Paiements',
    //       icon: '',
    //       url: '#/dashboard/caisse/caisse/paiement',
    //       role: ROLE_ADMIN,
    //       niveau: 2,
    //       children: []
    //     },
    //     {
    //       label: 'Remises de chèques',
    //       icon: '',
    //       url: '#/dashboard/caisse/caisse/cheques',
    //       role: ROLE_ADMIN,
    //       niveau: 2,
    //       children: []
    //     },
    //     {
    //       label: 'gestion devise',
    //       icon: '',
    //       url: '#/dashboard/caisse/caisse/currency',
    //       role: ROLE_ADMIN,
    //       niveau: 2,
    //       children: []
    //     }
    //   ]
    // },
    // {
    //   label: 'Stock',
    //   icon: 'ni ni-shop',
    //   url: '#/dashboard/caisse/caisse',
    //   role: ROLE_ADMIN,
    //   niveau: 1,
    //   children: [
    //     {
    //       label: 'Dépots',
    //       icon: '',
    //       url: '/#/dashboard/stock/depots',
    //       role: ROLE_ADMIN,
    //       niveau: 2,
    //       children: []
    //     },
    //     {
    //       label: 'Stock',
    //       icon: '',
    //       url: '#/dashboard/stock/stock',
    //       role: ROLE_ADMIN,
    //       niveau: 2,
    //       children: []
    //     }
    //     // {
    //     //   label: 'List Stock Caractéristiques ',
    //     //   icon: '',
    //     //   url: '#/dashboard/stock/stock/liststockwithattributes',
    //     //   role: ROLE_ADMIN,
    //     //   children: []
    //     // }
    //   ]
    // },
  ];
  constructor() {
  }
}
