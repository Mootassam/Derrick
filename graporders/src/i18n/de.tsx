
import Withdraw from "src/view/pages/withdraw/Withdraw";

const de = {
  app: {
    title: "Stellantis"
  },
  inputs: {
    username: "Benutzername",
    password: "Passwort",
    phoneNumber: "Telefonnummer",
    withdrawPassword: "Auszahlungs-Passwort",
    confirmPassword: "Passwort bestätigen",
    invitationcode: "Einladungscode",
    walletaddress: "Wallet-Adresse"
  },



  pages: {
    home: {
      levels: "VIP-Stufen",
      chooseLevel: "Wählen Sie Ihre Stufe, um Ihre Einnahmen zu maximieren",
      welcome: "Willkommen",
      announcement: "Liebe Benutzer, die Stellantis-Plattform ist wieder im besten und normalen Zustand, verdienen Sie weiterhin so viel wie möglich von der Plattform",

      // Action Buttons
      services: "Dienstleistungen",
      events: "Veranstaltungen",
      about: "Über uns",
      terms: "AGB",
      certificate: "Zertifikat",
      faqs: "FAQ",

      // VIP Level Cards
      currentLevel: "Aktuell",
      upgrade: "Upgrade",
      profitNormal: "Gewinn auf normale Produkte",
      profitPremium: "Gewinn auf Premium-Produkte",
      maxOrders: "Max. Bestellungen pro Tag",

      // Modal
      modal: {
        levelDetails: "Stufendetails",
        levelLimit: "Stufenlimit",
        dailyOrders: "Tägliche Bestellungen",
        commissionRate: "Provisionssatz",
        cancel: "Abbrechen",
        upgradeNow: "Jetzt upgraden"
      }
    },

    prizeModal: {
      congratulations: "Herzlichen Glückwunsch!",
      spinning: "Dreht sich...",
      prizeWon: "Sie haben gewonnen!",
      currency: "USD",
      prizeBreakdown: "Preisaufstellung",
      totalAmount: "Gesamtbetrag",
      yourWinnings: "Ihr Gewinn",
      claimPrize: "Preis beanspruchen",
      celebrationMessage: "Genießen Sie Ihre Belohnung!",
    },

    
    tabBottomNavigator: {
      home: "Startseite",
      grap: "Erfassen",
      records: "Aufzeichnungen",
      starting: "Starten"
    },

    transaction: {
      title: "Transaktionsverlauf",
      filters: {
        all: "Alle",
        withdraw: "Auszahlung",
        deposit: "Einzahlung"
      },
      recentTransactions: "Letzte Transaktionen",
      transactionCount: "{0} Transaktionen",
      types: {
        deposit: "Einzahlung",
        withdrawal: "Auszahlung"
      },
      status: {
        completed: "Abgeschlossen",
        processing: "In Bearbeitung",
        canceled: "Storniert"
      },
      amount: {
        deposit: "+${0}",
        withdraw: "-${0}",
        canceled: "${0}"
      }
    },

    profile: {
      title: "Profil",
      invitationCode: "Einladungscode",
      creditScore: "Kredit-Score",
      balance: "Guthaben",
      todayProfit: "Heutiger Gewinn",
      frozenAmount: "Eingefrorener Betrag",
      usd: "USD",

      // Menu Sections
      myFinancial: "Meine Finanzen",
      myDetails: "Meine Details",
      other: "Andere",

      // Financial Items
      recharge: "Aufladen",
      withdraw: "Auszahlen",

      // Details Items
      contactUs: "Kontaktieren Sie uns",
      profile: "Profil",
      updateWithdrawal: "Auszahlungsdetails aktualisieren",

      // Other Items
      transaction: "Transaktion",
      tasksHistory: "Aufgabenverlauf",
      security: "Sicherheit",
      notifications: "Benachrichtigungen",
      languages: "Sprachen",
      bindAccount: "Konto verknüpfen",
      details: "Details",
      officialWebsite: "Zugang zur offiziellen Website",
      changeLoginPassword: "Login-Passwort ändern",
      changeWithdrawPassword: "Auszahlungs-Passwort ändern",
      mainFunction: "Hauptfunktion",
      otherFunction: "Weitere Funktionen",
      uid: "UID",

      // Buttons
      logout: "Abmelden",
      confirm: "Bestätigen",
      copied: "Kopiert",

      // Modals
      rechargeModal: {
        title: "Aufladen",
        text: "Bitte kontaktieren Sie den Kundenservice zum Aufladen"
      },
      withdrawModal: {
        title: "Auszahlung",
        text: "Bitte kontaktieren Sie den Kundenservice, um mit Ihrer Auszahlung fortzufahren."
      },
      reputation: {
        title: "Reputationsregeln",
        description: "Jedes Konto verfügt über ein Reputationssystem basierend auf der Leistung des Mitglieds. Wenn Sie tägliche Aufgaben erledigen und eine gute Reputation aufrechterhalten, verbessert sich Ihr Score. Wenn Sie Fristen nicht einhalten, sinkt Ihr Score. Fällt Ihre Reputation unter 80 %, blockiert das System Auszahlungen. Bei Fragen wenden Sie sich bitte an den Kundendienst."
      }
    },

    team: {
      title: "Profil",
      personalInformation: "Persönliche Informationen",
      accountDetails: "Ihre Kontodetails und persönlichen Informationen",

      // Info Items
      fullName: "Vollständiger Name",
      email: "E-Mail",
      phoneNumber: "Telefonnummer",
      country: "Land",
      gender: "Geschlecht",
      invitationCode: "Einladungscode",

      // Gender Values
      genderNotSpecified: "Nicht angegeben",

      // Placeholders
      notAvailable: "—"
    },

    language: {
      title: "App-Sprache",
      selectLanguage: "Sprache auswählen",
      choosePreferred: "Wählen Sie Ihre bevorzugte Sprache",
      searchPlaceholder: "Sprachen suchen...",
      currentLanguage: "Aktuelle Sprache",

      // Language names (if needed for dynamic content)
      languages: {
        english: "Englisch",
        french: "Französisch",
        russian: "Russisch",
        german: "Deutsch",
        spanish: "Spanisch"
      },
      nativeNames: {
        english: "English",
        french: "Français",
        russian: "Русский",
        german: "Deutsch",
        spanish: "Español"
      }
    },

    online: {
      title: "Kundenservice",
      description: "Wenn Sie Fragen haben oder auf Probleme stoßen, senden Sie uns bitte eine E-Mail oder chatten Sie mit unserem Online-Kundensupport-Team.",
      contactWhatsApp: "Auf WhatsApp kontaktieren",
      contactTelegram: "Auf Telegram kontaktieren"
    },

    notifications: {
      title: "Benachrichtigungen",
      filters: {
        all: "Alle",
        deposit: "Einzahlung",
        withdraw: "Auszahlung"
      },
      unreadCount: "{0} ungelesen",
      emptyState: {
        title: "Keine Benachrichtigungen gefunden",
        description: "Sie haben noch keine {0} Benachrichtigungen."
      },

      // Notification Types
      types: {
        deposit_success: "Einzahlung erfolgreich",
        deposit_canceled: "Einzahlung storniert",
        withdraw_success: "Auszahlung erfolgreich",
        withdraw_canceled: "Auszahlung storniert",
        system: "Systembenachrichtigung",
        alert: "Wichtige Warnung",
        default: "Benachrichtigung"
      },

      // Notification Messages
      messages: {
        deposit_success: "Ihre Einzahlung von ${0} wurde erfolgreich abgeschlossen.",
        deposit_canceled: "Ihre Einzahlungsanfrage für ${0} wurde storniert.",
        withdraw_success: "Ihre Auszahlung von ${0} wurde erfolgreich abgeschlossen.",
        withdraw_canceled: "Ihre Auszahlungsanfrage für ${0} wurde storniert.",
        system: "Systembenachrichtigung",
        alert: "Wichtige Warnbenachrichtigung",
        default: "Benachrichtigungsupdate"
      },

      // Status
      status: {
        unread: "ungelesen",
        read: "gelesen"
      }
    },

    portfolio: {
      // Status Tabs
      completed: "Abgeschlossen",
      pending: "Ausstehend",
      canceled: "Storniert",

      // Order Information
      orderTime: "Bestellzeit",
      orderNumber: "Bestellnummer",
      totalOrderAmount: "Gesamtbestellbetrag",
      commission: "Provision",
      estimatedReturn: "Voraussichtliche Rendite",

      // Product Details
      quantity: "X 1",
      currency: "USD",

      // Status Labels
      status: {
        completed: "Abgeschlossen",
        pending: "Ausstehend",
        canceled: "Storniert"
      },
      submit: "Absenden"
    },

    changePassword: {
      title: "Passwort ändern",
      withdrawPassword: "Auszahlungs-Passwort ändern",
      header: "Passwort ändern",
      oldPassword: "Altes Passwort",
      newPassword: "Neues Passwort",
      confirmPassword: "Passwort bestätigen",
      submit: "Absenden",
      note: "Bitte füllen Sie diese Informationen sorgfältig aus",
      requiredField: "*"
    },

    withdraw: {
      title: "Auszahlung",

      announcement: "Der Mindestauszahlungsbetrag beträgt $5. Alle Auszahlungen werden innerhalb von 30 Minuten bearbeitet.",
      withdrawAmount: "Auszahlungsbetrag",
      withdrawPassword: "Auszahlungspasswort",
      availableBalance: "Verfügbares Guthaben",
      confirm: "Bestätigen",
      rulesDescription: "Regelbeschreibung",
      rules: {
        minimum: "(1) Mindestauszahlung beträgt $5 ",
        paymentTime: "(2) Die Zahlung wird innerhalb der nächsten Stunde nach Genehmigung des Auszahlungsantrags getätigt.",
        orderCompletion: "(3) Unvollständige tägliche Auftragserfüllung führt zu keiner Auszahlung, alle Produkte müssen für die Auszahlung eingereicht werden"
      },
      amountPlaceholder: "Betrag eingeben (min. $5)",
      selectMethod: "Auszahlungsmethode wählen",
      methods: {
        crypto: "Kryptowährung",
        bank: "Banküberweisung",
        cryptoNetworks: "TRC20 | ERC20",
        bankNetworks: "IBAN | SWIFT"
      },
      status: {
        complete: "✓ Vollständig",
        incomplete: "⚠ Unvollständig"
      },
      withdrawingTo: "Auszahlung an:",
      withdrawPasswordPlaceholder: "Geben Sie Ihr Auszahlungs-Passwort ein",
      bankModal: {
        title: "Unvollständige Bankdaten",
        required: "Bankdaten erforderlich",
        description: "Bitte vervollständigen Sie Ihre Bankdaten, bevor Sie eine Auszahlung vornehmen:"
      },
      cryptoModal: {
        title: "Unvollständige Krypto-Daten",
        required: "Kryptodaten erforderlich",
        description: "Bitte vervollständigen Sie Ihre Kryptodaten, bevor Sie eine Auszahlung vornehmen:"
      },
      goToBindAccount: "Zu Konto verknüpfen",
      completeDetailsIn: "Vervollständigen Sie Ihre Auszahlungsdetails in",
      enableAllOptions: "um alle Auszahlungsoptionen zu aktivieren.",
      validation: {
        selectMethod: "Bitte wählen Sie eine Auszahlungsmethode"
      }
    },

    wallet: {
      title: "Wallet",
      withdrawalMethod: "Informationen zur Auszahlungsmethode",
      username: "Benutzername",
      walletName: "Wallet-Name",
      choosePreferredCoin: "Bevorzugte Münze wählen",
      walletAddress: "Wallet-Adresse",
      withdrawPassword: "Auszahlungspasswort",
      submit: "Absenden",
      note: "Bitte seien Sie vorsichtig beim Ausfüllen dieser Informationen",
      requiredField: "*"
    },

    grab: {
      title: "Bewerten & Übernachten",
      description: "Search Off the Record führt Sie hinter die Kulissen von GoToMarketers Search. Jede Folge zeigt, wie wir Menschen helfen, Cars von zu Hause aus zu bewerten und zu entdecken.",
      seeAllReviews: "Alle Bewertungen ansehen",
      searchNow: "Jetzt suchen",
      stats: {
        myAssets: "Meine Vermögenswerte",
        earnings: "Einnahmen",
        tasksDone: "Abgeschlossene Aufgaben",
        onHold: "In Wartestellung"
      },
      // Header Section
      greeting: "Hallo {0} 👏",

      // Stats Cards
      totalAmount: "Gesamtbetrag",
      profitsAdded: "Gewinne werden hier hinzugefügt",
      todaysCommission: "Heutige Provision",
      commissionEarned: "Verdiente Provision",
      currency: "USD",

      // Optimization Section
      startOptimization: "Optimierung starten",
      progressCount: "{0}/{1}",

      // Game Section
      commissionRate: "Provisionssatz",
      exclusiveChannel: "Exklusiver Kanal für exklusive Mitglieder",
      startButton: "Starten",
      processing: "Wird verarbeitet...",

      // Notice Section
      notice: "Hinweis",
      supportHours: "Online-Supportzeiten 10:00 - 22:00",
      contactSupport: "Bitte kontaktieren Sie den Online-Support für Ihre Unterstützung!"
    },
    grap: {
      rateModal: {
        title: "Bewerten Sie Ihre Erfahrung",
        label: {
          tapToRate: "Zum Bewerten tippen",
          poor: "Schlecht",
          fair: "Mittel",
          good: "Gut",
          veryGood: "Sehr gut",
          excellent: "Ausgezeichnet"
        },
        selectOptions: "Wählen Sie Ihre Feedback-Optionen",
        more: "mehr",
        submit: "Bewertung senden",
        options: {
          0: "Die Zimmer waren sauber, sehr komfortabel und das Personal war großartig",
          1: "Es war großartig. Service wie immer erstklassig",
          2: "Das Personal dieser Unterkunft ist hervorragend! Sie tun alles, um Ihren Aufenthalt angenehm zu machen",
          3: "Ich hatte hier eine wunderbare Erfahrung",
          4: "Das Essen war großartig mit vielen Auswahlmöglichkeiten",
          5: "Ausgezeichnetes Car mit hervorragender Lage im Stadtzentrum",
          6: "Sehr zentral, komfortable Zimmer mit toller Klimaanlage. Frühstück war köstlich und das Personal äußerst hilfsbereit und freundlich"
        }
      },
      modal: {
        productName: "Produktname",
        positiveReviews: "positive Bewertungen"
      }
    },

    grapModal: {
      orderTime: "Bestellzeit",
      orderNumber: "Bestellnummer",
      totalOrderAmount: "Gesamtbestellbetrag",
      commission: "Provision",
      estimatedReturn: "Voraussichtliche Rendite",
      cancel: "Abbrechen",
      submit: "Absenden",
      quantity: "X 1",
      currency: "USD"
    },
    marketsHome: {
      heroTitle: "🌙 Finde deine Ruhe",
      heroSubtitle: "LuxusCars · private Rückzugsorte",
      search: {
        destinationPlaceholder: "Reiseziel, Stadt, Car",
        checkIn: "Check-in",
        checkOut: "Check-out",
        guestsPlaceholder: "2 Erwachsene · 0 Kinder",
        goToSearch: "Zur Suche",
        flexibleNote: "Flexible Daten? · Bester Preis"
      },
      sections: {
        dreamEscapesTitle: "📸 Traumhafte Auszeiten",
        exploreAll: "Alles erkunden",
        topPicksTitle: "✨ Top-Empfehlungen für dich",
        viewAll: "Alle ansehen"
      },
      features: {
        freeWifi: "Kostenloses WLAN",
        support: "24/7 Support",
        secure: "Sicher",
        bestRate: "Bester Preis"
      },
      footerTagline: "✦ Jetzt buchen, später entspannen · Keine versteckten Gebühren ✦"
    },
    activities: {
      title: "Aktivitäten",
      subtitle: "Die Aktion läuft auf Hochtouren, mach mit!"
    },
    help: {
      title: "Hilfe-Center",
      footer: "Für weitere Unterstützung wenden Sie sich bitte an unseren Online-Kundensupport.",
      accordion: {
        specialOrders: {
          title: "Zu Sonderaufträgen",
          content: "<p><strong>Was ist ein „besonderer Carauftrag“?</strong></p><p>Exklusive Vorteile mit ausgewählten LuxusCars; selten und nur für VIPs hoher Stufe.</p><p>Mystery-Box-Belohnungen möglich (Geldpreise und Sonderaufträge) mit 30–50-facher Provision.</p>"
        },
        platformRegulations: {
          title: "Plattformregeln",
          content: "<p>Auf „Suchen“ klicken, Auftrag abwarten und abschließen. Typisch <strong>30 Minuten</strong>.</p><p>Zufällige Zuweisung: <strong>keine Änderung/Stornierung/Überspringen</strong>.</p><p>Bei > <strong>15 Minuten</strong> ohne Einzahlung Support kontaktieren und Kontodaten bestätigen.</p><p>Öffnungszeiten: täglich <strong>9:00–21:00</strong>.</p><p>Bei Missbrauch des Kontos sofort Support kontaktieren.</p><p>Werbeauftrag: Einzahlung prüfen, dann <strong>„Senden“</strong> für <strong>Premium-Auftrag</strong>.</p><p>> 40.000 AED: <strong>Prüfgebühr</strong>, eine Stunde nach Verifizierung abhebbar.</p>"
        },
        deposits: {
          title: "Zu Einzahlungen",
          content: "<p>Über Ihr Konto „Aufladen“, Agent wählen, bereitgestellte Daten nutzen und Nachweis senden.</p><p>Bei Problemen Support kontaktieren.</p><p>Kontodaten vor Zahlung prüfen (tägliche Aktualisierung).</p><p><strong>Hinweis:</strong> Nur einzahlen, wenn Guthaben unter dem Auftragswert liegt.</p>"
        },
        withdrawals: {
          title: "Zu Auszahlungen",
          content: "<p>Nach täglichen Aufgaben Auszahlung anfordern (min. 40 AED). Auszahlungsinfos verknüpfen.</p><p>„Auszahlen“, Betrag und Passwort eingeben. Meist innerhalb 30 Minuten (bankabhängig).</p><p><strong>Zeiten:</strong> täglich <strong>9:00–21:00</strong>.</p>"
        },
        luxuryOrders: {
          title: "Zu Luxusaufträgen",
          content: "<p><strong>„Luxus-Carauftrag“:</strong> Werbekampagne zur Steigerung der Sichtbarkeit.</p><p>Kommissionen 10–30-fach; üblicherweise 0–2 Aufträge/Tag.</p><p><strong>Hinweis:</strong> Zugewiesene Aufträge müssen abgeschlossen werden; Anpassungen erscheinen im Konto.</p>"
        }
      }
    },
    tasks: {
      title: "Aufgaben",
      tabs: {
        all: "Alle",
        pending: "Ausstehend",
        completed: "Abgeschlossen",
        canceled: "Storniert"
      }
    },
    bindAccount: {
      title: "Konto verknüpfen",
      currentBankTitle: "Derzeit verknüpfte Bankkarte",
      bank: "BANK",
      cryptoTitle: "Kryptowährungsnetzwerk",
      cryptoLabel: "USDT (TRC20/ERC20)",
      popular: "Beliebt"
    },
    bankDetails: {
      title: "Bankkarte verknüpfen"
    },
    search: {
      placeholder: "Suchen"
    },
    vip: {
      title: "VIP-Stufen",
      subtitle: "Wählen Sie Ihre Mitgliedsstufe und schalten Sie exklusive Vorteile frei",
      backToHome: "Zurück zur Startseite",
      searchPlaceholder: "VIP-Stufen suchen...",
      noResults: "Keine VIP-Stufen gefunden",
      noResultsDesc: "Versuchen Sie, Ihre Suchbegriffe anzupassen",
      currentLevel: "Aktuelle Stufe",
      upgrade: "Upgrade",
      locked: "Gesperrt",
      currentlyOn: "Derzeit auf",
      upgradeTo: "Upgrade auf",
      levelDetails: "Stufendetails",
      levelLimit: "Stufenlimit",
      dailyOrders: "Tägliche Bestellungen",
      setperday: "Sets pro Tag",
      commissionRate: "Provisionssatz",
      premiumCommission: "Premium-Provision",
      maxOrders: "Max. Bestellungen",
      commission: "Provision",
      benefits: "Vorteile",
      cancel: "Abbrechen",
      upgradeNow: "Jetzt upgraden",
      upgrading: "Wird aktualisiert...",
      level: "VIP-Stufe",
      pointPeriod: "Punktezeitraum: {0} Tage",
      modal: {
        alreadyMember: "Sie sind bereits Mitglied dieser VIP-Stufe.",
        contactSupportMessage: "Bitte kontaktieren Sie den Kundensupport, um Ihr VIP zu erhöhen.",
        contactSupport: "Support kontaktieren"
      }
    },
    invitation: {
      teamAmount: "Team-Betrag",
      stats: {
        dailyInvitations: "Tägliche Einladungen",
        monthlyInvitations: "Monatliche Einladungen",
        monthlyIncome: "Monatliches Einkommen"
      },
      rulesButton: "Regeln der Freunde-einladen-Aktion",
      newAgents: "Neue Agenten",
      table: {
        memberId: "Mitglieds-ID",
        recharge: "Aufladen",
        withdraw: "Auszahlen"
      },
      noMoreData: "Keine weiteren Daten",
      modal: {
        title: "Freunde einladen und verdienen",
        referralCodeLabel: "Ihr Empfehlungscode:",
        copy: "Kopieren",
        shareLabel: "Teilen Sie Ihren Empfehlungscode:"
      },
      notAllowed: {
        title: "Zugriff eingeschränkt",
        message: "Sie dürfen derzeit keine Benutzer einladen.",
        submessage: "Das Empfehlungssystem ist derzeit für Ihr Konto deaktiviert. Bitte kontaktieren Sie den Support für weitere Informationen oder um Zugriff anzufordern.",
        contactSupport: "Support kontaktieren",
        gotIt: "Verstanden"
      }
    },

    actions: {
      event: "Veranstaltungen",
      tc: "Geschäftsbedingungen",
      certificate: "Zertifikat",
      faq: "Häufig gestellte Fragen",
      company: "Unternehmen"
    },

    auth: {
      signin: {
        welcomeBack: "Willkommen zurück!",
        signinToAccount: "Melden Sie sich bei Ihrem Marketing-Konto an",
        signinButton: "Anmelden",
        noAccount: "Noch kein Konto?",
        signupHere: "Hier registrieren."
      },
      signup: {
        createAccount: "Konto erstellen",
        signupForAccount: "Registrieren Sie sich für ein Marketing-Konto",
        signupButton: "Registrieren",
        alreadyHaveAccount: "Haben Sie bereits ein Konto?",
        phonePlaceholder: "Geben Sie Ihre Telefonnummer ein",
        searchCountries: "Länder suchen..."
      }
    },

    csPage: {
      customerSupport: "Kundenservice",
      hereToHelp: "Wir sind hier, um Ihnen zu helfen!",
      howCanWeHelp: "Wie können wir Ihnen heute helfen?",
      platformNames: {
        whatsapp: "WhatsApp",
        telegram: "Telegram"
      }
    },
  },
  entities: {
    record: {
      menu: "Records",
      fields: {
        user: "Benutzer",
        product: "Produkt",
        number: "Record Nummer",
        status: "Status",
      },
      list: {
        title: "Liste der Records",
      },
      view: {
        title: "Record Details",
      },
      edit: {
        title: "Record bearbeiten",
      },
      create: {
        success: "Produkt erfolgreich eingereicht.",
      },
      update: {
        success: "Produkt erfolgreich eingereicht.",
      },
      destroy: {
        success: "Record erfolgreich gelöscht",
      },
      destroyAll: {
        success: "Record erfolgreich gelöscht",
      },
      enumerators: {
        status: {
          pending: "Ausstehend",
          completed: "Abgeschlossen",
          canceled: "Storniert",
        },
      },
    },

    category: {
      name: "Kategorie",
      label: "Kategorien",
      menu: "Kategorien",
      exporterFileName: "kategorie_export",
      list: {
        menu: "Kategorien",
        title: "Kategorien",
      },
      create: {
        success: "Kategorie erfolgreich gespeichert",
      },
      update: {
        success: "Kategorie erfolgreich gespeichert",
      },
      destroy: {
        success: "Kategorie erfolgreich gelöscht",
      },
      destroyAll: {
        success: "Kategorie(n) erfolgreich gelöscht",
      },
      edit: {
        title: "Kategorie bearbeiten",
      },
      fields: {
        id: "Id",
        name: "Name",
        slug: "Slug",
        photo: "Foto",
        metaKeywords: "Meta-Keywords",
        metaDescriptions: "Meta-Beschreibungen",
        status: "Status",
        isFeature: "Ist Feature",
        serialRange: "Seriennummer",
        serial: "Seriennummer",
        createdAt: "Erstellt am",
        updatedAt: "Aktualisiert am",
        createdAtRange: "Erstellt am",
      },
      enumerators: {
        status: {
          enable: "Aktivieren",
          disable: "Deaktivieren",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Neue Kategorie",
      },
      view: {
        title: "Kategorie anzeigen",
      },
      importer: {
        title: "Kategorien importieren",
        fileName: "kategorie_import_vorlage",
        hint: "Datei-/Bildspalten müssen die URLs der Dateien sein, getrennt durch Leerzeichen.",
      },
    },

    product: {
      name: "produkt",
      label: "Produkte",
      menu: "Produkte",
      exporterFileName: "produkt_export",
      list: {
        menu: "Produkte",
        title: "Produkte",
      },
      create: {
        success: "Produkt erfolgreich gespeichert",
      },
      update: {
        success: "Produkt erfolgreich gespeichert",
      },
      destroy: {
        success: "Produkt erfolgreich gelöscht",
      },
      destroyAll: {
        success: "Produkt(e) erfolgreich gelöscht",
      },
      edit: {
        title: "Produkt bearbeiten",
      },
      fields: {
        id: "Id",
        name: "Name",
        slug: "Slug",
        tags: "Tags",
        video: "Video",
        specificationName: "Spezifikationsname",
        specificationDesciption: "Spezifikationsbeschreibung",
        isSpecification: "Ist Spezifikation",
        details: "Details",
        photo: "Foto",
        discountPriceRange: "Rabattpreis",
        discountPrice: "Aktueller Preis",
        previousPriceRange: "Vorheriger Preis",
        previousPrice: "Vorheriger Preis",
        stockRange: "Lagerbestand",
        stock: "Lagerbestand",
        metaKeywords: "Meta-Keywords",
        metaDesctiption: "Kurze Beschreibung",
        status: "Status",
        isType: "Typ",
        dateRange: "Datum",
        date: "Datum",
        itemType: "Artikeltyp",
        file: "Datei",
        link: "Link",
        fileType: "Dateityp",
        taxe: "Steuer",
        category: "Kategorie",
        subcategory: "Unterkategorie",
        childcategory: "Untergeordnete Kategorie",
        brand: "Marke",
        gallery: "Galerie",
        createdAt: "Erstellt am",
        updatedAt: "Aktualisiert am",
        createdAtRange: "Erstellt am",
      },
      enumerators: {
        status: {
          enable: "Aktivieren",
          disable: "Deaktivieren",
        },
        itemType: {
          physical: "Physisch",
          digitale: "Digital",
        },
        fileType: {
          file: "Datei",
          link: "Link",
        },
        isType: {
          new_arrival: "Neuankömmling",
          feature_product: "Feature-Produkt",
          top_pdroduct: "Top-Produkt",
          best_product: "Bestes Produkt",
          flash_deal_product: "Flash-Deal-Produkt",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Neues Produkt",
      },
      view: {
        title: "Produkt anzeigen",
      },
      importer: {
        title: "Produkte importieren",
        fileName: "produkt_import_vorlage",
        hint: "Datei-/Bildspalten müssen die URLs der Dateien sein, getrennt durch Leerzeichen.",
      },
    },
    transaction: {
      name: "transaktion",
      label: "Transaktionen",
      menu: "Transaktionen",
      exporterFileName: "transaktion_export",
      list: {
        menu: "Transaktionen",
        title: "Transaktionen",
      },
      create: {
        success: "Transaktion erfolgreich gesendet",
      },
      update: {
        success: "Transaktion erfolgreich gespeichert",
      },
      destroy: {
        success: "Transaktion erfolgreich gelöscht",
      },
      destroyAll: {
        success: "Transaktion(en) erfolgreich gelöscht",
      },
      edit: {
        title: "Transaktion bearbeiten",
      },
      fields: {
        id: "Id",
        accountHolder: "Kontoinhaber",
        ibanNumber: "IBAN-Nummer",
        bankName: "Bankname",
        ifscCode: "IFSC-Code",
        amountRange: "Betrag",
        amount: "Betrag",
        email: "E-Mail",
        tax: "Steuer",
        currencySign: "Währungssymbol",
        currencyValue: "Währungswert",
        orderId: "Bestell-ID",
        createdAt: "Erstellt am",
        updatedAt: "Aktualisiert am",
        createdAtRange: "Erstellt am",
      },
      enumerators: {
        status: {
          pending: "Ausstehend",
          completed: "Erfolg",
          canceled: "Storniert",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Neue Transaktion",
      },
      view: {
        title: "Transaktion anzeigen",
      },
      importer: {
        title: "Transaktionen importieren",
        fileName: "transaktion_import_vorlage",
        hint: "Datei-/Bildspalten müssen die URLs der Dateien sein, getrennt durch Leerzeichen.",
      },
    },

    order: {
      name: "bestellung",
      label: "Bestellungen",
      menu: "Bestellungen",
      exporterFileName: "bestellung_export",
      list: {
        menu: "Bestellungen",
        title: "Bestellungen",
      },
      create: {
        success: "Bestellung erfolgreich gespeichert",
      },
      update: {
        success: "Bestellung erfolgreich gespeichert",
      },
      destroy: {
        success: "Bestellung erfolgreich gelöscht",
      },
      destroyAll: {
        success: "Bestellung(en) erfolgreich gelöscht",
      },
      edit: {
        title: "Bestellung bearbeiten",
      },
      fields: {
        id: "Id",
        userId: "Benutzer",
        cart: "Warenkorb",
        shipping: "Versand",
        discountRange: "Rabatt",
        discount: "Rabatt",
        paymentMethod: "Zahlungsmethode",
        taxe: "Steuer",
        transactionNumber: "Transaktionsnummer",
        orderStatus: "Bestellstatus",
        createdAt: "Erstellt am",
        updatedAt: "Aktualisiert am",
        createdAtRange: "Erstellt am",
      },
      enumerators: {
        orderStatus: {
          pending: "Ausstehend",
          in_progress: "In Bearbeitung",
          delivered: "Geliefert",
          canceled: "Storniert",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Neue Bestellung",
      },
      view: {
        title: "Bestellung anzeigen",
      },
      importer: {
        title: "Bestellungen importieren",
        fileName: "bestellung_import_vorlage",
        hint: "Datei-/Bildspalten müssen die URLs der Dateien sein, getrennt durch Leerzeichen.",
      },
    },
  },


  user: {
    fields: {
      genre: "Geschlecht",
      username: "Benutzername",
      walletName: "Wallet-Name",
      id: "ID",
      confirmPassword: "Passwort bestätigen",
      avatars: "Avatar",
      invitationcode: "Einladungscode",
      email: "E-Mail",
      emails: "E-Mail(s)",
      erc20: "ERC20-Wallet-Adresse",
      trc20: "TRC20-Wallet-Adresse",
      fullName: "Name",
      balance: "Kontostand",
      firstName: "Vorname",
      lastName: "Nachname",
      status: "Status",
      phoneNumber: "Telefonnummer",
      withdrawPassword: "Auszahlungspasswort",
      sector: "Branche",
      employer: "Arbeitgeber",
      profession: "Beruf",
      address: "Adresse",
      birthDate: "Geburtsdatum",
      maritalStatus: "Familienstand",
      facebookLink: "Facebook-Link",
      sponsor: "Sponsor",
      role: "Rolle",
      createdAt: "Erstellt am",
      updatedAt: "Aktualisiert am",
      roleUser: "Rolle/Benutzer",
      roles: "Rollen",
      createdAtRange: "Erstellt am",
      password: "Passwort",
      oldPassword: "Altes Passwort",
      newPassword: "Neues Passwort",
      newPasswordConfirmation: "Neues Passwort bestätigen",
      rememberMe: "Angemeldet bleiben",
    },
    sector: {
      AGRO_ALIMENTAIRE: "Lebensmittelindustrie",
      ASSURANCES: "Versicherung",
      AUDIOVISUEL: "Audiovisuell",
      BANCAIRE: "Bankwesen",
      CHIMIE: "Chemie",
      COMPOSANTS_AUTOMOBILES: "Automobilkomponenten",
      DISTRIBUTION: "Vertrieb",
      DISTRIBUTION_AUTOMOBILE: "Automobilvertrieb",
      DIVERS: "Verschiedenes",
      FINANCIER: "Finanzen",
      HOLDING: "Holding",
      IMMOBILIER: "Immobilien",
      INDUSTRIEL: "Industrie",
      LEASING: "Leasing",
      LOGISTIQUE_TRANSPORT: "Logistik und Transport",
      PHARMACEUTIQUE: "Pharmazeutisch",
      SANTÉ: "Gesundheit",
      TOURSIME: "Tourismus",
      INFORMATION_TECHNOLOGY: "Informationstechnologie",
    },
    maritalStatus: {
      célébataire: "Ledig",
      marié: "Verheiratet",
    },
    status: {
      active: "Aktiv",
      invited: "Eingeladen",
      "empty-permissions": "Warte auf Berechtigungen",
      inactive: "Inaktiv",
    },

    enumerators: {
      status: {
        USDT: "USDT",
        ETH: "ETH",
        BTC: "BTC",
        TRC20: "TRC20"
      },
      gender: {
        male: "männlich",
        female: "weiblich",
      }
    },
    invite: "Einladen",
    validations: {
      // eslint-disable-next-line
      email: "E-Mail ${value} ist ungültig",
    },
    title: "Benutzer",
    menu: "Benutzer",
    doAddSuccess: "Benutzer erfolgreich gespeichert",
    doUpdateSuccess: "Benutzer erfolgreich gespeichert",
    exporterFileName: "benutzer_export",
    doDestroySuccess: "Benutzer erfolgreich gelöscht",
    doDestroyAllSelectedSuccess: "Benutzer erfolgreich gelöscht",
    edit: {
      title: "Benutzer bearbeiten",
    },
    new: {
      title: "Benutzer einladen",
      titleModal: "Benutzer einladen",
      emailsHint:
        "Trennen Sie mehrere E-Mail-Adressen durch Kommas.",
    },
    view: {
      title: "Benutzer anzeigen",
      activity: "Aktivität",
    },
    importer: {
      title: "Benutzer importieren",
      fileName: "benutzer_import_vorlage",
      hint: "Datei-/Bildspalten müssen die URLs der Dateien sein, getrennt durch Leerzeichen. Beziehungen müssen die IDs der referenzierten Datensätze sein, getrennt durch Leerzeichen. Rollen müssen die Rollen-IDs sein, getrennt durch Leerzeichen.",
    },
    errors: {
      userAlreadyExists: "Ein Benutzer mit dieser E-Mail existiert bereits",
      userNotFound: "Benutzer nicht gefunden",
      revokingOwnPermission: `Sie können Ihre eigene Administratorberechtigung nicht widerrufen`,
    },
  },


  buttons: {
    login: "Anmelden",
    registerNow: "Jetzt registrieren",
    signup: "Registrieren",
    start: "Start",
    orders: "Bestellungen",
    submit: "Absenden",
    backtohome: "Zurück zur Startseite",
    confirm: "Bestätigen",
    logout: "Abmelden",
    getstarted: "Loslegen",
  },


  text: {
    welcome: "Willkommen",
    discover: "Entdecken Sie exklusive Angebote nur für Sie",
    signin: "Anmelden",
    haveaccount: "Bereits ein Konto?",
    noaccount: "Noch kein Konto?",
    showingnow: "Jetzt im Kino",
    comingsoon: "Demnächst",
    termsconditions: "Allgemeine Geschäftsbedingungen",
    todayearning: "Heutiges Einkommen",
    accountbalance: "Kontostand",
    freezebalance: "Eingefrorenes Guthaben",
    sumbitInformation: "Informationen übermitteln",
    order: "Bestellung",
    pending: "Ausstehend",
    completed: "Abgeschlossen",
    canceled: "Storniert",
    notransaction: "Es gibt noch keine Transaktionen!",
    createdtime: "Erstellungszeit",
    creationtime: "Erstellungszeit",
    orderNumber: "Bestellnummer",
    orderamount: "Bestellbetrag",
    income: "Einkommen",
    buyerating: "Käuferbewertung",
    uid: "UID",
    promotioncode: "Rabattcode",
    walletamount: "Wallet-Betrag",
    creditassesment: "Kreditbewertung",
    myfinance: "Meine Finanzen",
    withdraw: "Auszahlen",
    mydetails: "Meine Daten",
    profile: "Profil",
    wallet: "Wallet",
    other: "Andere",
    customersupport: "Kundensupport",
    transaction: "Transaktion",
    taskshistory: "Aufgabenverlauf",
    security: "Sicherheit",
    sponsor: `Unsere Sicherheit hat oberste Priorität, und wir möchten sicherstellen, dass
              Sie vor potenziellen Risiken geschützt sind. Bitte beachten Sie, dass wir
              Sie niemals auffordern werden, Geld an eine unbekannte Adresse zu senden. Bevor
              Sie Zahlungen tätigen, überprüfen Sie bitte die Details bei uns.`,
  },
  errors: {
    backToHome: "Zurück zur Startseite",
    403: "Entschuldigung, Sie haben keinen Zugriff auf diese Seite",
    404: "Entschuldigung, die von Ihnen besuchte Seite existiert nicht",
    500: "Entschuldigung, der Server meldet einen Fehler",
    429: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
    forbidden: {
      message: "Zugriff verweigert",
    },
    validation: {
      message: "Ein Fehler ist aufgetreten",
    },
    defaultErrorMessage: "Hoppla, ein Fehler ist aufgetreten",
  },

  withdraw: {
    withdrawamount: "Auszahlungsbetrag",
    Withdrawpassword: "Auszahlungs-Passwort",
    availablebalance: "Verfügbares Guthaben",
    rules: "Regelbeschreibung",
    rule1: "Der Mindestbetrag für eine Auszahlung beträgt 20 $",
    rule2: "Die Zahlung erfolgt innerhalb von 24 Stunden nach Beantragung der Auszahlung",
    rule3: "Unvollständige tägliche Bestellungen können nicht ausgezahlt werden, alle Produkte müssen eingereicht werden"
  },
  profile: {
    profile: "Profil",
    fullname: "Vollständiger Name",
    email: "E-Mail",
    phonenumber: "Telefonnummer",
    country: "Land",
    Invitationcode: "Einladungscode"
  },
  wallet: {
    wallet: "Wallet",
    info: "Informationen zur Auszahlungsmethode",
    username: "Benutzername",
    walletname: "Wallet-Name",
    walletaddress: "Wallet-Adresse",
    note: "Hinweis",
    notedesctiption: "Bitte seien Sie vorsichtig beim Ausfüllen dieser Informationen."
  },

  cs: {
    cs: "Kundendienst",
    note: "Wenn Sie Fragen haben oder auf Probleme stoßen, senden Sie uns eine E-Mail oder chatten Sie mit unserem Online-Kundendienstteam.",
    contactnow: "Jetzt kontaktieren"
  },
  transaction: {
    transaction: "Transaktion",
    all: "Alle",
    withdraw: "Auszahlung",
    dposit: "Einzahlung",
    notransaction: "Es gibt noch keine Transaktionen!"
  },
  order: {
    order: "Bestellung",
    completed: "Abgeschlossen",
    pending: "Ausstehend",
    canceled: "Storniert",
    ordertime: "Bestellzeit",
    ordernumber: "Bestellnummer",
    total: "Gesamtbetrag der Bestellung",
    commission: "Provision",
    return: "Geschätzte Rückzahlung"
  },

  security: {
    changepassword: "Passwort ändern",
    oldpassword: "Altes Passwort",
    newpassword: "Neues Passwort",
    confirmpassword: "Passwort bestätigen",
    note: "Hinweis",
    notedesc: "Bitte füllen Sie diese Informationen sorgfältig aus"
  },





  auth: {
    tenants: "Arbeitsbereiche",
    singindesc: "Geben Sie Ihre E-Mail und Ihr Passwort ein, um sich anzumelden",
    signupdesc: "Geben Sie Ihre E-Mail und Ihr Passwort ein, um sich zu registrieren",
    profile: {
      title: "Profil",
      success: "Profil erfolgreich aktualisiert",
      vip: "Herzlichen Glückwunsch zum Abonnement",
    },
    createAnAccount: "Ein Konto erstellen",
    rememberMe: "Angemeldet bleiben",
    forgotPassword: "Passwort vergessen?",
    signin: "Anmelden",
    signup: "Registrieren",
    signout: "Abmelden",
    alreadyHaveAnAccount: "Haben Sie bereits ein Konto? Anmelden.",
    social: {
      errors: {
        "auth-invalid-provider":
          "Diese E-Mail ist bereits bei einem anderen Anbieter registriert.",
        "auth-no-email": "Die mit diesem Konto verknüpfte E-Mail ist privat oder nicht vorhanden.",
      },
    },
    signinWithAnotherAccount: "Mit einem anderen Konto anmelden",
    emailUnverified: {
      message: `Bitte bestätigen Sie Ihre E-Mail unter <strong>{0}</strong>, um fortzufahren.`,
      submit: "E-Mail-Bestätigung erneut senden",
    },
    emptyPermissions: {
      message: "Sie haben noch keine Berechtigungen. Warten Sie, bis der Administrator Ihnen Zugriffsrechte erteilt.",
    },
    passwordResetEmail: {
      message: "E-Mail zum Zurücksetzen des Passworts senden",
      error: "E-Mail nicht erkannt",
    },
    passwordReset: {
      message: "Passwort zurücksetzen",
    },
    passwordChange: {
      title: "Passwort ändern",
      success: "Passwort erfolgreich geändert",
      mustMatch: "Die Passwörter müssen übereinstimmen",
    },
    emailAddressVerificationEmail: {
      error: "E-Mail nicht erkannt",
    },
    verificationEmailSuccess: "Bestätigungs-E-Mail erfolgreich gesendet",
    passwordResetEmailSuccess: "Passwort-Reset-E-Mail erfolgreich gesendet",
    passwordResetSuccess: "Passwort erfolgreich geändert",
    verifyEmail: {
      success: "E-Mail erfolgreich bestätigt.",
      message: "Einen Moment, Ihre E-Mail wird überprüft...",
    },
  },

  tabbarmenue: {
    home: "Startseite",
    rate: "Bewerten",
    profile: "Profil"
  },

  validation: {
    mixed: {
      default: "${path} ist ungültig",
      required: "${path} ist erforderlich",
      oneOf: "${path} muss einer der folgenden Werte sein: ${values}",
      notOneOf: "${path} darf keiner der folgenden Werte sein: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} muss ein ${type} sein`;
      },
    },
    string: {
      length: "${path} muss genau ${length} Zeichen lang sein",
      min: "${path} muss mindestens ${min} Zeichen lang sein",
      max: "${path} darf höchstens ${max} Zeichen lang sein",
      matches: '${path} muss folgendem Muster entsprechen: "${regex}"',
      email: "${path} muss eine gültige E-Mail-Adresse sein",
      url: "${path} muss eine gültige URL sein",
      trim: "${path} darf keine führenden oder nachgestellten Leerzeichen enthalten",
      lowercase: "${path} muss in Kleinbuchstaben sein",
      uppercase: "${path} muss in Großbuchstaben sein",
      selected: "${path} muss ausgewählt sein",
    },
    number: {
      min: "${path} muss größer oder gleich ${min} sein",
      max: "${path} muss kleiner oder gleich ${max} sein",
      lessThan: "${path} muss kleiner als ${less} sein",
      moreThan: "${path} muss größer als ${more} sein",
      notEqual: "${path} darf nicht gleich ${notEqual} sein",
      positive: "${path} muss eine positive Zahl sein",
      negative: "${path} muss eine negative Zahl sein",
      integer: "${path} muss eine ganze Zahl sein",
    },
    date: {
      min: "${path} muss nach ${min} liegen",
      max: "${path} muss vor ${max} liegen",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} darf keine nicht definierten Schlüssel enthalten",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} ist erforderlich`
          : `${path} muss mindestens ${min} Elemente enthalten`,
      max: "${path} darf höchstens ${max} Elemente enthalten",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Hochladen",
    image: "Sie müssen ein Bild hochladen",
    size: "Die Datei ist zu groß. Die maximal erlaubte Größe beträgt {0}",
    formats: `Ungültiges Format. Muss eines der folgenden sein: {0}.`,
  },

  settings: {
    title: "Einstellungen",
    menu: "Einstellungen",
    save: {
      success:
        "Einstellungen erfolgreich gespeichert. Die Seite lädt in {0} Sekunden neu, damit die Änderungen wirksam werden.",
    },
    fields: {
      theme: "Theme",
      logos: "Logo",
      backgroundImages: "Hintergrundbild",
    },
    colors: {
      default: "Dunkel",
      light: "Hell",
      cyan: "Cyan",
      "geek-blue": "Geek Blau",
      gold: "Gold",
      lime: "Limette",
      magenta: "Magenta",
      orange: "Orange",
      "polar-green": "Polar Grün",
      purple: "Lila",
      red: "Rot",
      volcano: "Vulkan",
      yellow: "Gelb",
    },
  },
  dashboard: {
    menu: "Dashboard",
    valider: "Validieren",
    file: "Keine Datei ausgewählt",
    typecsv: "Ungültiger Dateityp. Bitte wählen Sie eine CSV-Datei.",
    reset: "Zurücksetzen",
    phone: "Nummern hochladen",
    check: "Nummer prüfen",
    labelphone: "Telefonnummer eingeben",
    add: "Nummer hinzufügen",
    download: "Vorlage herunterladen",
    added: "Nummer hinzugefügt",
    duplicated: "Nummer dupliziert",
    Wrong: "Nummer falsch",
    notFound: "Entschuldigung, wir konnten die gesuchten Elemente nicht finden.",
    validation: "Nummer erfolgreich hinzugefügt",
    Success: "Nummer erfolgreich hinzugefügt",
    numberValidation: "Geben Sie eine gültige Nummer ein. Danke.",
    message:
      "Diese Seite verwendet Beispieldaten nur zu Demonstrationszwecken. Sie können sie unter frontend/view/dashboard/DashboardPage.ts bearbeiten.",
    charts: {
      day: "Tag",
      red: "Rot",
      green: "Grün",
      yellow: "Gelb",
      grey: "Grau",
      blue: "Blau",
      orange: "Orange",
      months: {
        1: "Januar",
        2: "Februar",
        3: "März",
        4: "April",
        5: "Mai",
        6: "Juni",
        7: "Juli",
        8: "August",
        9: "September",
        10: "Oktober",
        11: "November",
        12: "Dezember",
      },
      eating: "Essen",
      drinking: "Trinken",
      sleeping: "Schlafen",
      designing: "Designen",
      coding: "Programmieren",
      cycling: "Radfahren",
      running: "Laufen",
      customer: "Kunde",
      objectif: "Ziele nach Status",
      projectS: "Projekte nach Status",
      projectT: "Projekte nach Typ",
      adherent: "Anzahl der Mitglieder",
      news: "Anzahl der Nachrichten",
      project: "Anzahl der Projekte",
      partner: "Anzahl der Partner",
      nodata: "Keine Daten zum Anzeigen",
    },
  },
  imagesViewer: {
    noImage: "Kein Bild",
  },
  autocomplete: {
    loading: "Laden...",
    noOptions: "Keine Daten gefunden",
  },
  table: {
    noData: "Keine Einträge gefunden",
    loading: "Laden...",
  },
  footer: {
    copyright: "© {0} stellantisDigitales Marketing",
  },
  preview: {
    error: "Diese Operation ist im Vorschaumodus nicht erlaubt.",
  },

};

export default de;
