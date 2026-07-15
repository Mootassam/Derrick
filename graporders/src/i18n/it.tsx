

const it = {
    app: {
        title: "The Light Cinema"
    },
    inputs: {
        username: "Nome utente",
        password: "password",
        phoneNumber: "Numero di telefono",
        withdrawPassword: "Password di prelievo",
        confirmPassword: "Conferma password",
        invitationcode: "Codice di invito",
        walletaddress: "Indirizzo del portafoglio"

    },


    pages: {
        home: {
            levels: "Livelli VIP",
            chooseLevel: "Scegli il tuo livello per massimizzare i tuoi guadagni",
            welcome: "Benvenuto",
            announcement: "Cari utenti, la piattaforma stellantisè tornata al meglio e normale, continuate a guadagnare il più possibile dalla piattaforma",

            // Action Buttons
            services: "Servizi",
            events: "Eventi",
            about: "Chi siamo",
            terms: "T&C",
            certificate: "Certificato",
            faqs: "FAQ",

            // VIP Level Cards
            currentLevel: "Attuale",
            upgrade: "Aggiorna",
            profitNormal: "profitto sui prodotti normali",
            profitPremium: "profitto sui prodotti premium",
            maxOrders: "Ordini massimi al giorno",

            // Modal
            modal: {
                levelDetails: "Dettagli Livello",
                levelLimit: "Limite Livello",
                dailyOrders: "Ordini Giornalieri",
                commissionRate: "Tasso di Commissione",
                cancel: "Annulla",
                upgradeNow: "Aggiorna Ora"
            }
        },



        prizeModal: {
            congratulations: "Congratulazioni!",
            spinning: "Ruotando...",
            prizeWon: "Hai vinto!",
            currency: "USD",
            prizeBreakdown: "Dettaglio Premio",
            totalAmount: "Importo Totale",
            yourWinnings: "Il tuo Guadagno",
            claimPrize: "Riscatta il Premio",
            celebrationMessage: "Goditi la tua ricompensa!",
        },


        tabBottomNavigator: {
            home: "Home",
            grap: "Acquisisci",
            records: "Registri",
            starting: "Avvia"
        },


        transaction: {
            title: "Cronologia Transazioni",
            filters: {
                all: "Tutte",
                withdraw: "Prelievo",
                deposit: "Deposito"
            },
            recentTransactions: "Transazioni Recenti",
            transactionCount: "{0} transazioni",
            types: {
                deposit: "Deposito",
                withdrawal: "Prelievo"
            },
            status: {
                completed: "Completato",
                processing: "In elaborazione",
                canceled: "Annullato"
            },
            amount: {
                deposit: "+${0}",
                withdraw: "-${0}",
                canceled: "${0}"
            }
        },
        profile: {
            title: "Profilo",
            invitationCode: "Codice Invito",
            creditScore: "Punteggio Credito",
            balance: "Saldo",
            todayProfit: "Profitto di Oggi",
            frozenAmount: "Importo Congelato",
            usd: "USD",

            // Menu Sections
            myFinancial: "Le mie Finanze",
            myDetails: "I miei Dettagli",
            other: "Altro",

            // Financial Items
            recharge: "Ricarica",
            withdraw: "Prelievo",

            // Details Items
            contactUs: "Contattaci",
            profile: "Profilo",
            updateWithdrawal: "Aggiorna dettagli prelievo",

            // Other Items
            transaction: "Transazione",
            tasksHistory: "Cronologia Attività",
            security: "Sicurezza",
            notifications: "Notifiche",
            languages: "Lingue",
            bindAccount: "Collega account",
            details: "Dettagli",
            officialWebsite: "Ingresso sito ufficiale",
            changeLoginPassword: "Cambia password di accesso",
            changeWithdrawPassword: "Cambia password di prelievo",
            mainFunction: "Funzione principale",
            otherFunction: "Altre funzioni",
            uid: "UID",

            // Buttons
            logout: "Disconnetti",
            confirm: "Conferma",
            copied: "Copiato",

            // Modals
            rechargeModal: {
                title: "Ricarica",
                text: "Si prega di contattare il servizio clienti per ricaricare"
            },
            withdrawModal: {
                title: "Prelievo",
                text: "Si prega di contattare il servizio clienti per procedere con il prelievo."
            },
            reputation: {
                title: "Regole di reputazione",
                description: "Ogni account ha un sistema di reputazione basato sulle prestazioni del membro. Se completi le attività giornaliere e mantieni una buona reputazione, il tuo punteggio migliorerà. Se non rispetti le scadenze, il tuo punteggio diminuirà. Se la tua reputazione scende sotto l'80%, il sistema bloccherà i prelievi. Per qualsiasi domanda, contatta il servizio clienti."
            }
        },

        team: {
            title: "Profilo",
            personalInformation: "Informazioni Personali",
            accountDetails: "I dettagli del tuo account e le informazioni personali",

            // Info Items
            fullName: "Nome Completo",
            email: "Email",
            phoneNumber: "Numero di Telefono",
            country: "Paese",
            gender: "Genere",
            invitationCode: "Codice Invito",

            // Gender Values
            genderNotSpecified: "Non specificato",

            // Placeholders
            notAvailable: "—"
        },

        language: {
            title: "Lingua App",
            selectLanguage: "Seleziona Lingua",
            choosePreferred: "Scegli la tua lingua preferita",
            searchPlaceholder: "Cerca lingue...",
            currentLanguage: "Lingua Corrente",

            // Language names (if needed for dynamic content)
            languages: {
                english: "Inglese",
                french: "Francese",
                russian: "Russo",
                german: "Tedesco",
                spanish: "Spagnolo"
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
            title: "Servizio Clienti",
            description: "Se hai domande o incontri problemi, ti preghiamo di inviarci un'email o chattare con il nostro team di supporto clienti online.",
            contactWhatsApp: "Contatta su WhatsApp",
            contactTelegram: "Contatta su Telegram"
        },

        notifications: {
            title: "Notifiche",
            filters: {
                all: "Tutte",
                deposit: "Deposito",
                withdraw: "Prelievo"
            },
            unreadCount: "{0} non lette",
            emptyState: {
                title: "Nessuna notifica trovata",
                description: "Non hai ancora notifiche {0}."
            },

            // Notification Types
            types: {
                deposit_success: "Deposito Riuscito",
                deposit_canceled: "Deposito Annullato",
                withdraw_success: "Prelievo Riuscito",
                withdraw_canceled: "Prelievo Annullato",
                system: "Notifica Sistema",
                alert: "Avviso Importante",
                default: "Notifica"
            },

            // Notification Messages
            messages: {
                deposit_success: "Il tuo deposito di ${0} è stato completato con successo.",
                deposit_canceled: "La tua richiesta di deposito di ${0} è stata annullata.",
                withdraw_success: "Il tuo prelievo di ${0} è stato completato con successo.",
                withdraw_canceled: "La tua richiesta di prelievo di ${0} è stata annullata.",
                system: "Notifica sistema",
                alert: "Notifica avviso importante",
                default: "Aggiornamento notifica"
            },

            // Status
            status: {
                unread: "non letta",
                read: "letta"
            }
        },

        portfolio: {
            // Status Tabs
            completed: "Completate",
            pending: "In Attesa",
            canceled: "Annullate",

            // Order Information
            orderTime: "Ora Ordine",
            orderNumber: "Numero Ordine",
            totalOrderAmount: "Importo ordine totale",
            commission: "Commissione",
            estimatedReturn: "Ritorno stimato",

            // Product Details
            quantity: "X 1",
            currency: "USD",

            // Status Labels
            status: {
                completed: "Completata",
                pending: "In Attesa",
                canceled: "Annullata"
            },
            submit: "Invia"
        },

        changePassword: {
            title: "Cambia Password",
            withdrawPassword: "Cambia password di prelievo",
            header: "Cambia Password",
            oldPassword: "Vecchia Password",
            newPassword: "Nuova Password",
            confirmPassword: "Conferma Password",
            submit: "Invia",
            note: "Si prega di compilare queste informazioni con attenzione",
            requiredField: "*"
        },

        withdraw: {
            title: "Prelievo",
            announcement: "L'importo minimo di prelievo è $5. Tutti i prelievi vengono elaborati entro 30 minuti.",
            withdrawAmount: "Importo Prelievo",
            withdrawPassword: "Password Prelievo",
            availableBalance: "Saldo disponibile",
            confirm: "Conferma",
            rulesDescription: "Descrizione Regole",
            rules: {
                minimum: "(1) Il prelievo minimo è di $5 ",
                paymentTime: "(2) Il pagamento verrà effettuato entro l'ora successiva, dopo l'approvazione della richiesta di prelievo.",
                orderCompletion: "(3) L'invio incompleto degli ordini giornalieri è soggetto a nessun prelievo, tutti i prodotti devono essere inviati per il prelievo"
            },
            amountPlaceholder: "Inserisci importo (min. $5)",
            selectMethod: "Seleziona metodo di prelievo",
            methods: {
                crypto: "Criptovaluta",
                bank: "Bonifico bancario",
                cryptoNetworks: "TRC20 | ERC20",
                bankNetworks: "IBAN | SWIFT"
            },
            status: {
                complete: "✓ Completo",
                incomplete: "⚠ Incompleto"
            },
            withdrawingTo: "Prelievo verso:",
            withdrawPasswordPlaceholder: "Inserisci la tua password di prelievo",
            bankModal: {
                title: "Dettagli bancari incompleti",
                required: "Dettagli bancari richiesti",
                description: "Completa i tuoi dettagli bancari prima di effettuare un prelievo:"
            },
            cryptoModal: {
                title: "Dettagli crypto incompleti",
                required: "Dettagli criptovaluta richiesti",
                description: "Completa i tuoi dettagli di criptovaluta prima di effettuare un prelievo:"
            },
            goToBindAccount: "Vai a Collega account",
            completeDetailsIn: "Completa i dettagli di prelievo in",
            enableAllOptions: "per abilitare tutte le opzioni di prelievo.",
            validation: {
                selectMethod: "Seleziona un metodo di prelievo"
            }
        },

        wallet: {
            title: "Portafoglio",
            withdrawalMethod: "Informazioni metodo prelievo",
            username: "Nome Utente",
            walletName: "Nome Portafoglio",
            choosePreferredCoin: "Scegli coin preferita",
            walletAddress: "Indirizzo Portafoglio",
            withdrawPassword: "Password Prelievo",
            submit: "Invia",
            note: "Si prega di prestare attenzione durante la compilazione di queste informazioni",
            requiredField: "*"
        },

        grab: {
            title: "Valuta e soggiorna",
            description: "Search Off the Record ti porta dietro le quinte di GoToMarketers Search. Ogni episodio rivela come aiutiamo le persone a valutare e scoprire Car da casa.",
            seeAllReviews: "Vedi tutte le recensioni",
            searchNow: "Cerca ora",
            // Header Section
            greeting: "Ciao {0} 👏",

            // Stats Cards
            totalAmount: "Importo Totale",
            profitsAdded: "I profitti verranno aggiunti qui",
            todaysCommission: "Commissione di Oggi",
            commissionEarned: "Commissione Guadagnata",
            currency: "USD",

            // Optimization Section
            startOptimization: "Avvia Ottimizzazione",
            progressCount: "{0}/{1}",

            // Game Section
            commissionRate: "Tasso di Commissione",
            exclusiveChannel: "Canale esclusivo per membri esclusivi",
            startButton: "Avvia",
            processing: "Elaborazione...",

            // Notice Section
            notice: "Avviso",
            supportHours: "Orari Supporto Online 10:00 - 22:00",
            contactSupport: "Si prega di contattare il supporto online per assistenza!",
            errors: {
                insufficientBalance: "Saldo insufficiente. Ricarica il tuo conto per continuare."
            },
            messages: {
                completedTasks: "Hai completato tutte le attività disponibili. Contatta il supporto per reimpostare il tuo account."
            },
            stats: {
                myAssets: "I miei asset",
                earnings: "Guadagni",
                tasksDone: "Attività completate",
                onHold: "In attesa"
            }
        },
        grap: {
            rateModal: {
                title: "Valuta la tua esperienza",
                label: {
                    tapToRate: "Tocca per valutare",
                    poor: "Scarso",
                    fair: "Discreto",
                    good: "Buono",
                    veryGood: "Molto buono",
                    excellent: "Eccellente"
                },
                selectOptions: "Seleziona le opzioni di feedback",
                more: "altro",
                submit: "Invia recensione",
                options: {
                    0: "Le camere erano pulite, molto confortevoli e lo staff era fantastico",
                    1: "È stato ottimo. Servizio di prima classe come sempre",
                    2: "Il personale di questa struttura è eccellente! Fanno di tutto per rendere il soggiorno confortevole",
                    3: "Ho avuto un'esperienza meravigliosa qui",
                    4: "Il cibo era ottimo con molte scelte",
                    5: "Car eccellente con posizione eccellente nel centro città",
                    6: "Molto centrale con camere confortevoli e aria condizionata fantastica. Colazione deliziosa e personale estremamente disponibile e cordiale"
                }
            },
            modal: {
                productName: "Nome prodotto",
                positiveReviews: "recensioni positive"
            }
        },

        grapModal: {
            orderTime: "Ora Ordine",
            orderNumber: "Numero Ordine",
            totalOrderAmount: "Importo ordine totale",
            commission: "Commissione",
            estimatedReturn: "Ritorno stimato",
            cancel: "Annulla",
            submit: "Invia",
            quantity: "X 1",
            currency: "USD"
        },
        marketsHome: {
            heroTitle: "🌙 Trova la tua calma",
            heroSubtitle: "Car di lusso · ritiri privati",
            search: {
                destinationPlaceholder: "Destinazione, città, Car",
                checkIn: "Check-in",
                checkOut: "Check-out",
                guestsPlaceholder: "2 adulti · 0 bambini",
                goToSearch: "Vai alla ricerca",
                flexibleNote: "Date flessibili? · Miglior prezzo"
            },
            sections: {
                dreamEscapesTitle: "📸 Fughe da sogno",
                exploreAll: "Esplora tutto",
                topPicksTitle: "✨ Scelte migliori per te",
                viewAll: "Vedi tutto"
            },
            features: {
                freeWifi: "WiFi gratuito",
                support: "Supporto 24/7",
                secure: "Sicuro",
                bestRate: "Miglior tariffa"
            },
            footerTagline: "✦ Prenota ora, rilassati dopo · Nessuna tariffa nascosta ✦"
        },
        activities: {
            title: "Attività",
            subtitle: "La promozione è in pieno svolgimento, vieni e unisciti!"
        },
        help: {
            title: "Centro assistenza",
            footer: "Per ulteriore assistenza, contatta il nostro supporto clienti online.",
            accordion: {
                specialOrders: {
                    title: "Riguardo agli ordini speciali",
                    content: "<p><strong>Cos'è un \"Ordine speciale d'Car\"?</strong></p><p>Vantaggi esclusivi con Car di lusso selezionati; rari e solo per VIP di alto livello.</p><p>Mystery Box con premi in denaro e Ordini Speciali: commissioni 30–50 volte la tariffa standard.</p>"
                },
                platformRegulations: {
                    title: "Regole della piattaforma",
                    content: "<p>Premi \"Cerca\", attendi l'ordine e completalo. In genere <strong>30 minuti</strong>.</p><p>Assegnazione casuale: <strong>non modificabile, annullabile o ignorabile</strong>.</p><p>Se passano > <strong>15 minuti</strong> senza deposito, contatta il supporto e conferma i dati.</p><p>Orari: <strong>9:00 - 21:00</strong> ogni giorno.</p><p>Se l'account è usato impropriamente, contatta subito il supporto.</p><p>Per la pubblicità: verifica il deposito e premi <strong>\"Invia\"</strong> per completare l'<strong>Ordine Premium</strong>.</p><p>Per prelievi > 40.000 AED: <strong>tassa di verifica</strong>, prelevabile <strong>un'ora dopo la verifica</strong>.</p>"
                },
                deposits: {
                    title: "Informazioni sui depositi",
                    content: "<p>Dal tuo account, premi \"Ricarica\", scegli l'incaricato, usa i dati forniti e invia la ricevuta.</p><p>Se hai problemi, contatta il supporto online.</p><p>Verifica sempre il conto di deposito (aggiornato quotidianamente) prima di pagare.</p><p><strong>Nota:</strong> Deposita solo se il saldo è inferiore al prezzo dell'ordine.</p>"
                },
                withdrawals: {
                    title: "Informazioni sui prelievi",
                    content: "<p>Dopo le attività giornaliere, richiedi il prelievo (min 40 AED). Associa le informazioni di prelievo.</p><p>Premi \"Prelievo\", inserisci l'importo e la password. In genere entro 30 minuti (dipende dalla banca).</p><p><strong>Orari:</strong> <strong>9:00 - 21:00</strong> ogni giorno.</p>"
                },
                luxuryOrders: {
                    title: "Riguardo agli ordini di lusso",
                    content: "<p><strong>Ordine d'Car di lusso:</strong> campagna per aumentare la visibilità del marchio.</p><p>Commissioni 10–30 volte superiori; 0–2 ordini al giorno.</p><p><strong>Nota:</strong> Gli ordini assegnati devono essere completati; l'accredito si riflette sull'account.</p>"
                }
            }
        },
        tasks: {
            title: "Attività",
            tabs: {
                all: "Tutte",
                pending: "In attesa",
                completed: "Completate",
                canceled: "Annullate"
            }
        },
        bindAccount: {
            title: "Collega account",
            currentBankTitle: "Carta bancaria attualmente collegata",
            bank: "BANCA",
            cryptoTitle: "Rete di criptovaluta",
            cryptoLabel: "USDT (TRC20/ERC20)",
            popular: "Popolare"
        },
        bankDetails: {
            title: "Collegamento carta bancaria"
        },
        search: {
            placeholder: "Cerca"
        },
        vip: {
            title: "Livelli VIP",
            subtitle: "Scegli il tuo livello di abbonamento e sblocca vantaggi esclusivi",
            backToHome: "Torna alla Home",
            searchPlaceholder: "Cerca livelli VIP...",
            noResults: "Nessun livello VIP trovato",
            noResultsDesc: "Prova a modificare i termini di ricerca",
            currentLevel: "Livello corrente",
            upgrade: "Aggiorna",
            locked: "Bloccato",
            currentlyOn: "Attualmente su",
            upgradeTo: "Aggiorna a",
            levelDetails: "Dettagli livello",
            levelLimit: "Limite livello",
            dailyOrders: "Ordini giornalieri",
            setperday: "Set al giorno",
            commissionRate: "Tasso di commissione",
            premiumCommission: "Commissione Premium",
            maxOrders: "Ordini massimi",
            commission: "Commissione",
            benefits: "Benefici",
            cancel: "Annulla",
            upgradeNow: "Aggiorna ora",
            upgrading: "Aggiornamento...",
            level: "Livello VIP",
            pointPeriod: "Periodo punti: {0} giorni",
            modal: {
                alreadyMember: "Sei già membro di questo livello VIP.",
                contactSupportMessage: "Contatta il supporto clienti per aggiornare il tuo VIP.",
                contactSupport: "Contatta il supporto"
            }
        },
        invitation: {
            teamAmount: "Importo del team",
            stats: {
                dailyInvitations: "Inviti giornalieri",
                monthlyInvitations: "Inviti mensili",
                monthlyIncome: "Reddito mensile"
            },
            rulesButton: "Regole attività Invita amici",
            newAgents: "Nuovi agenti",
            table: {
                memberId: "ID Membro",
                recharge: "Ricarica",
                withdraw: "Prelievo"
            },
            noMoreData: "Nessun altro dato",
            modal: {
                title: "Invita amici e guadagna",
                referralCodeLabel: "Il tuo codice di riferimento:",
                copy: "Copia",
                shareLabel: "Condividi il tuo codice di riferimento:"
            },
            notAllowed: {
                title: "Accesso limitato",
                message: "Al momento non ti è consentito invitare utenti.",
                submessage: "Il sistema di referral è attualmente disabilitato per il tuo account. Contatta il supporto per maggiori informazioni o per richiedere l'accesso.",
                contactSupport: "Contatta il supporto",
                gotIt: "Ho capito"
            }
        },

        actions: {
            event: "Eventi",
            tc: "Termini e Condizioni",
            certificate: "Certificato",
            faq: "Domande Frequenti",
            company: "Azienda"
        },

        auth: {
            signin: {
                welcomeBack: "Bentornato!",
                signinToAccount: "Accedi al tuo account marketing",
                signinButton: "Accedi",
                noAccount: "Non hai un account?",
                signupHere: "Registrati qui."
            },
            signup: {
                createAccount: "Crea Account",
                signupForAccount: "Registrati per un account marketing",
                signupButton: "Registrati",
                alreadyHaveAccount: "Hai già un account?",
                phonePlaceholder: "Inserisci il tuo numero di telefono",
                searchCountries: "Cerca paesi..."
            }
        },

        csPage: {
            customerSupport: "Servizio Clienti",
            hereToHelp: "Siamo qui per aiutarti!",
            howCanWeHelp: "Come possiamo aiutarti oggi?",
            platformNames: {
                whatsapp: "WhatsApp",
                telegram: "Telegram"
            }
        },
    },
    entities: {
        record: {
            menu: "Registri",
            fields: {
                user: "utente",
                product: "prodotto",
                number: "numero di registro",
                status: "stato",
            },
            list: {
                title: "Elenco dei registri",
            },
            view: {
                title: "Dettaglio Registro",
            },
            edit: {
                title: "Modifica Registro",
            },
            create: {
                success: "Prodotto inviato con successo.",
            },
            update: {
                success: "Prodotto inviato con successo.",
            },
            destroy: {
                success: "Registro eliminato con successo",
            },
            destroyAll: {
                success: "Registro eliminato con successo",
            },
            enumerators: {
                status: {
                    pending: "In attesa",
                    completed: "Completato",
                    canceled: "Annullato",
                },
            },
        },

        category: {
            name: "categoria",
            label: "Categorie",
            menu: "Categorie",
            exporterFileName: "esportazione_categoria",
            list: {
                menu: "Categorie",
                title: "Categorie",
            },
            create: {
                success: "Categoria salvata con successo",
            },
            update: {
                success: "Categoria salvata con successo",
            },
            destroy: {
                success: "Categoria eliminata con successo",
            },
            destroyAll: {
                success: "Categoria/e eliminata/e con successo",
            },
            edit: {
                title: "Modifica Categoria",
            },
            fields: {
                id: "Id",
                name: "Nome",
                slug: "Slug",
                photo: "Foto",
                metaKeywords: "Parole chiave Meta",
                metaDescriptions: "Descrizioni Meta",
                status: "Stato",
                isFeature: "È in evidenza",
                serialRange: "Seriale",
                serial: "Seriale",
                createdAt: "Creato il",
                updatedAt: "Aggiornato il",
                createdAtRange: "Creato il",
            },
            enumerators: {
                status: {
                    enable: "Abilita",
                    disable: "Disabilita",
                },
            },
            placeholders: {},
            hints: {},
            new: {
                title: "Nuova Categoria",
            },
            view: {
                title: "Visualizza Categoria",
            },
            importer: {
                title: "Importa Categorie",
                fileName: "modello_importazione_categoria",
                hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio.",
            },
        },

        product: {
            name: "prodotto",
            label: "Prodotti",
            menu: "Prodotti",
            exporterFileName: "esportazione_prodotto",
            list: {
                menu: "Prodotti",
                title: "Prodotti",
            },
            create: {
                success: "Prodotto salvato con successo",
            },
            update: {
                success: "Prodotto salvato con successo",
            },
            destroy: {
                success: "Prodotto eliminato con successo",
            },
            destroyAll: {
                success: "Prodotto/i eliminato/i con successo",
            },
            edit: {
                title: "Modifica Prodotto",
            },
            fields: {
                id: "Id",
                name: "Nome",
                slug: "Slug",
                tags: "Tag",
                video: "Video",
                specificationName: "Nome Specifica",
                specificationDesciption: "Descrizione Specifica",
                isSpecification: "È Specifica",
                details: "Dettagli",
                photo: "Foto",
                discountPriceRange: "Prezzo Scontato",
                discountPrice: "Prezzo Attuale",
                previousPriceRange: "Prezzo Precedente",
                previousPrice: "Prezzo Precedente",
                stockRange: "Scorta",
                stock: "Scorta",
                metaKeywords: "Parole chiave Meta",
                metaDesctiption: "Descrizione Breve",
                status: "Stato",
                isType: "Tipo",
                dateRange: "Data",
                date: "Data",
                itemType: "Tipo Articolo",
                file: "File",
                link: "Link",
                fileType: "Tipo File",
                taxe: "Tassa",
                category: "Categoria",
                subcategory: "Sottocategoria",
                childcategory: "Sotto-sottocategoria",
                brand: "Marca",
                gallery: "Galleria",
                createdAt: "Creato il",
                updatedAt: "Aggiornato il",
                createdAtRange: "Creato il",
            },
            enumerators: {
                status: {
                    enable: "Abilita",
                    disable: "Disabilita",
                },
                itemType: {
                    physical: "fisico",
                    digitale: "Digitale",
                },
                fileType: {
                    file: "File",
                    link: "Link",
                },
                isType: {
                    new_arrival: "Nuovo Arrivo",
                    feature_product: "Prodotto in Evidenza",
                    top_pdroduct: "Prodotto Top",
                    best_product: "Miglior Prodotto",
                    flash_deal_product: "Prodotto Offerta Lampo",
                },
            },
            placeholders: {},
            hints: {},
            new: {
                title: "Nuovo Prodotto",
            },
            view: {
                title: "Visualizza Prodotto",
            },
            importer: {
                title: "Importa Prodotti",
                fileName: "modello_importazione_prodotto",
                hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio.",
            },
        },
        transaction: {
            name: "transazione",
            label: "Transazioni",
            menu: "Transazioni",
            exporterFileName: "esportazione_transazione",
            list: {
                menu: "Transazioni",
                title: "Transazioni",
            },
            create: {
                success: "Transazione inviata con successo",
            },
            update: {
                success: "Transazione salvata con successo",
            },
            destroy: {
                success: "Transazione eliminata con successo",
            },
            destroyAll: {
                success: "Transazione/i eliminata/e con successo",
            },
            edit: {
                title: "Modifica Transazione",
            },
            fields: {
                id: "Id",
                accountHolder: "Intestatario del conto",
                ibanNumber: "Numero IBAN",
                bankName: "Nome banca",
                ifscCode: "Codice IFSC",
                amountRange: "Importo",
                amount: "Importo",
                email: "Email",
                tax: "Tassa",
                currencySign: "Simbolo Valuta",
                currencyValue: "Valore Valuta",
                orderId: "ID Ordine",
                createdAt: "Creato il",
                updatedAt: "Aggiornato il",
                createdAtRange: "Creato il",
            },
            enumerators: {
                status: {
                    pending: "In attesa",
                    completed: "Successo",
                    canceled: "Annullato",
                },
            },
            placeholders: {},
            hints: {},
            new: {
                title: "Nuova Transazione",
            },
            view: {
                title: "Visualizza Transazione",
            },
            importer: {
                title: "Importa Transazioni",
                fileName: "modello_importazione_transazione",
                hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio.",
            },
        },

        order: {
            name: "ordine",
            label: "Ordini",
            menu: "Ordini",
            exporterFileName: "esportazione_ordine",
            list: {
                menu: "Ordini",
                title: "Ordini",
            },
            create: {
                success: "Ordine salvato con successo",
            },
            update: {
                success: "Ordine salvato con successo",
            },
            destroy: {
                success: "Ordine eliminato con successo",
            },
            destroyAll: {
                success: "Ordine/i eliminato/i con successo",
            },
            edit: {
                title: "Modifica Ordine",
            },
            fields: {
                id: "Id",
                userId: "Utente",
                cart: "Carrello",
                shipping: "Spedizione",
                discountRange: "Sconto",
                discount: "Sconto",
                paymentMethod: "Metodo di Pagamento",
                taxe: "Tassa",
                transactionNumber: "Numero Transazione",
                orderStatus: "Stato Ordine",
                createdAt: "Creato il",
                updatedAt: "Aggiornato il",
                createdAtRange: "Creato il",
            },
            enumerators: {
                orderStatus: {
                    pending: "In attesa",
                    in_progress: "In corso",
                    delivered: "Consegnato",
                    canceled: "Annullato",
                },
            },
            placeholders: {},
            hints: {},
            new: {
                title: "Nuovo Ordine",
            },
            view: {
                title: "Visualizza Ordine",
            },
            importer: {
                title: "Importa Ordini",
                fileName: "modello_importazione_ordine",
                hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio.",
            },
        },
    },

    user: {
        fields: {
            genre: "Genere",
            username: "Nome utente",
            walletName: "Nome portafoglio",
            id: "Id",
            confirmPassword: "Conferma password",
            avatars: "Avatar",
            invitationcode: "Codice invito",
            email: "Email",
            emails: "Email",
            erc20: "Indirizzo portafoglio ERC20",
            trc20: "Indirizzo portafoglio TRC20",
            fullName: "Nome",
            balance: "Saldo",
            firstName: "Nome",
            lastName: "Cognome",
            status: "Stato",
            phoneNumber: "Numero di telefono",
            withdrawPassword: "Password prelievo",
            sector: "Settore",
            employer: "Datore di lavoro",
            profession: "Professione",
            address: "Indirizzo",
            birthDate: "Data di nascita",
            maritalStatus: "Stato civile",
            facebookLink: "Link Facebook",
            sponsor: "Sponsor",
            role: "Ruolo",
            createdAt: "Creato il",
            updatedAt: "Aggiornato il",
            roleUser: "Ruolo/Utente",
            roles: "Ruoli",
            createdAtRange: "Creato il",
            password: "Password",
            oldPassword: "Vecchia password",
            newPassword: "Nuova password",
            newPasswordConfirmation: "Conferma nuova password",
            rememberMe: "Ricordami",
        },
        sector: {
            AGRO_ALIMENTAIRE: "Industria alimentare",
            ASSURANCES: "Assicurazioni",
            AUDIOVISUEL: "Audiovisivo",
            BANCAIRE: "Bancario",
            CHIMIE: "Chimica",
            COMPOSANTS_AUTOMOBILES: "Componenti automobilistici",
            DISTRIBUTION: "Distribuzione",
            DISTRIBUTION_AUTOMOBILE: "Distribuzione automobilistica",
            DIVERS: "Varie",
            FINANCIER: "Finanziario",
            HOLDING: "Holding",
            IMMOBILIER: "Immobiliare",
            INDUSTRIEL: "Industriale",
            LEASING: "Leasing",
            LOGISTIQUE_TRANSPORT: "Logistica e trasporti",
            PHARMACEUTIQUE: "Farmaceutico",
            SANTÉ: "Salute",
            TOURSIME: "Turismo",
            INFORMATION_TECHNOLOGY: "Tecnologia informatica",
        },
        maritalStatus: {
            célébataire: "Single",
            marié: "Sposato",
        },
        status: {
            active: "Attivo",
            invited: "Invitato",
            "empty-permissions": "In attesa di permessi",
            inactive: "Inattivo",
        },

        enumerators: {
            status: {
                USDT: "USDT",
                ETH: "ETH",
                BTC: "BTC",
                TRC20: "TRC20",
            },
            gender: {
                male: "maschio",
                female: "femmina",
            }
        },
        invite: "Invita",
        validations: {
            // eslint-disable-next-line
            email: "L'email ${value} non è valida",
        },
        title: "Utenti",
        menu: "Utenti",
        doAddSuccess: "Utente(i) salvato(i) con successo",
        doUpdateSuccess: "Utente salvato con successo",
        exporterFileName: "utenti_esportazione",
        doDestroySuccess: "Utente eliminato con successo",
        doDestroyAllSelectedSuccess: "Utenti eliminati con successo",
        edit: {
            title: "Modifica Utente",
        },
        new: {
            title: "Invita Utente(i)",
            titleModal: "Invita Utente",
            emailsHint:
                "Separa più indirizzi email utilizzando il carattere virgola.",
        },
        view: {
            title: "Visualizza Utente",
            activity: "Attività",
        },
        importer: {
            title: "Importa Utenti",
            fileName: "modello_importazione_utenti",
            hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio. Le relazioni devono essere l'ID dei record referenziati separati da spazio. I ruoli devono essere gli ID ruolo separati da spazio.",
        },
        errors: {
            userAlreadyExists: "Esiste già un utente con questa email",
            userNotFound: "Utente non trovato",
            revokingOwnPermission: `Non puoi revocare il tuo permesso di amministratore`,
        },
    },
    buttons: {
        login: "Accedi",
        registerNow: "Registrati ora",
        signup: "Iscriviti",
        start: "Inizia",
        orders: "Ordini",
        submit: "Invia",
        backtohome: "Torna alla home",
        confirm: "Conferma",
        logout: "Disconnetti",
        getstarted: "Inizia",
    },
    text: {
        welcome: "Benvenuto",
        discover: "Scopri offerte esclusive solo per te",
        signin: "Accedi",
        haveaccount: "Hai già un account",
        noaccount: "Non hai un account",
        showingnow: "In programmazione",
        comingsoon: "Prossimamente",
        termsconditions: "Termini e condizioni",
        todayearning: "Guadagni di oggi",
        accountbalance: "Saldo del conto",
        freezebalance: "Saldo bloccato",
        sumbitInformation: "Invia informazioni",
        order: "Ordine",
        pending: "In sospeso",
        completed: "Completato",
        canceled: "Annullato",
        notransaction: "Nessuna transazione fino ad ora!",
        createdtime: "Ora di creazione",
        creationtime: "Tempo di creazione",
        orderNumber: "Numero d'ordine",
        orderamount: "Importo dell'ordine",
        income: "Reddito",
        buyerating: "Valutazione dell'acquirente",
        uid: "UID",
        promotioncode: "Codice promozionale",
        walletamount: "Importo portafoglio",
        creditassesment: "Valutazione del credito",
        myfinance: "Le mie finanze",
        withdraw: "Prelievo",
        mydetails: "I miei dettagli",
        profile: "Profilo",
        wallet: "Portafoglio",
        other: "Altro",
        customersupport: "Supporto clienti",
        transaction: "Transazione",
        taskshistory: "Cronologia attività",
        security: "Sicurezza",
        sponsor: "La nostra sicurezza è la nostra massima priorità e vogliamo assicurarci che tu sia protetto da eventuali rischi. Ti informiamo che non ti chiederemo mai di inviare denaro a un indirizzo sconosciuto. Prima di effettuare pagamenti, ti chiediamo gentilmente di verificare i dettagli con noi.",
    },
    errors: {
        backToHome: "Torna alla home",
        403: "Spiacente, non hai accesso a questa pagina",
        404: "Spiacente, la pagina che hai visitato non esiste",
        500: "Spiacente, il server sta segnalando un errore",
        429: "Troppe richieste. Riprova più tardi.",
        forbidden: {
            message: "Vietato",
        },
        validation: {
            message: "Si è verificato un errore",
        },
        defaultErrorMessage: "Ops, si è verificato un errore",
    },

    withdraw: {
        withdrawamount: "Importo del prelievo",
        Withdrawpassword: "Password di prelievo",
        availablebalance: "Saldo disponibile",
        rules: "Descrizione delle regole",
        rule1: "Il prelievo minimo è di 20$",
        rule2: "Il pagamento verrà effettuato entro 24 ore dalla richiesta di prelievo",
        rule3: "La mancata presentazione dell'ordine giornaliero comporta l'impossibilità di prelevare, tutti i prodotti devono essere presentati per il prelievo"
    },

    profile: {
        profile: "Profilo",
        fullname: "Nome completo",
        email: "Email",
        phonenumber: "Numero di telefono",
        country: "Paese",
        Invitationcode: "Codice di invito"
    },

    wallet: {
        wallet: "Portafoglio",
        info: "Informazioni sul metodo di prelievo",
        username: "Nome utente",
        walletname: "Nome del portafoglio",
        walletaddress: "Indirizzo del portafoglio",
        note: "Nota",
        notedesctiption: "Si prega di prestare attenzione nella compilazione di queste informazioni."
    },

    cs: {
        cs: "Servizio clienti",
        note: "Se hai domande o riscontri problemi, inviaci un'email o chatta con il nostro team di supporto online.",
        contactnow: "Contatta ora"
    },

    transaction: {
        transaction: "Transazione",
        all: "Tutti",
        withdraw: "Prelievo",
        dposit: "Deposito",
        notransaction: "Nessuna transazione fino ad ora!"
    },

    tabbarmenue: {
        home: "Home",
        rate: "Valutazione",
        profile: "Profilo"
    },

    validation: {
        mixed: {
            default: "${path} non è valido",
            required: "${path} è obbligatorio",
            oneOf: "${path} deve essere uno dei seguenti valori: ${values}",
            notOneOf: "${path} non deve essere uno dei seguenti valori: ${values}",
            notType: ({ path, type }) => `${path} deve essere un ${type}`,
        },
        string: {
            length: "${path} deve essere esattamente di ${length} caratteri",
            min: "${path} deve avere almeno ${min} caratteri",
            max: "${path} deve avere al massimo ${max} caratteri",
            matches: "${path} deve corrispondere a: \"${regex}\"",
            email: "${path} deve essere un'email valida",
            url: "${path} deve essere un URL valido",
        },
    },

    fileUploader: {
        upload: "Carica",
        image: "Devi caricare un'immagine",
        size: "Il file è troppo grande. La dimensione massima consentita è {0}",
        formats: "Formato non valido. Deve essere uno di: {0}."
    },

    settings: {
        title: "Impostazioni",
        menu: "Impostazioni",
        save: {
            success:
                "Impostazioni salvate con successo. La pagina verrà ricaricata tra {0} secondi per applicare le modifiche.",
        },
        fields: {
            theme: "Tema",
            logos: "Logo",
            backgroundImages: "Immagine di sfondo",
        },
        colors: {
            default: "Scuro",
            light: "Chiaro",
            cyan: "Ciano",
            "geek-blue": "Geek Blu",
            gold: "Oro",
            lime: "Lime",
            magenta: "Magenta",
            orange: "Arancione",
            "polar-green": "Verde Polare",
            purple: "Viola",
            red: "Rosso",
            volcano: "Vulcano",
            yellow: "Giallo",
        },
    },
    dashboard: {
        menu: "Dashboard",
        valider: "Convalida",
        file: "Nessun file selezionato",
        typecsv: "Tipo di file non valido. Seleziona un file CSV.",
        reset: "Reimposta",
        phone: "Carica numeri",
        check: "Controlla numero",
        labelphone: "Scrivi il numero di telefono",
        add: "Aggiungi numero",
        download: "Scarica il modello",
        added: "Numero aggiunto",
        duplicated: "Numero duplicato",
        Wrong: "Numero errato",
        notFound: "Spiacente, non abbiamo trovato gli elementi cercati.",
        validation: "Numero aggiunto con successo",
        Success: "Numero aggiunto con successo",
        numberValidation: "Scrivi un numero valido. Grazie.",
        message:
            "Questa pagina utilizza dati fittizi solo a scopo dimostrativo. Puoi modificarla in frontend/view/dashboard/DashboardPage.ts.",
        charts: {
            day: "Giorno",
            red: "Rosso",
            green: "Verde",
            yellow: "Giallo",
            grey: "Grigio",
            blue: "Blu",
            orange: "Arancione",
            months: {
                1: "Gennaio",
                2: "Febbraio",
                3: "Marzo",
                4: "Aprile",
                5: "Maggio",
                6: "Giugno",
                7: "Luglio",
                8: "Agosto",
                9: "Settembre",
                10: "Ottobre",
                11: "Novembre",
                12: "Dicembre",
            },
            eating: "Mangiare",
            drinking: "Bere",
            sleeping: "Dormire",
            designing: "Progettazione",
            coding: "Programmazione",
            cycling: "Ciclismo",
            running: "Corsa",
            customer: "Cliente",
            objectif: "Obiettivi per stato",
            projectS: "Progetti per stato",
            projectT: "Progetti per tipo",
            adherent: "Numero di membri",
            news: "Numero di notizie",
            project: "Numero di progetti",
            partner: "Numero di partner",
            nodata: "nessun dato da visualizzare",
        },
    },
    imagesViewer: {
        noImage: "Nessuna immagine",
    },
    autocomplete: {
        loading: "Caricamento...",
        noOptions: "Nessun dato trovato",
    },
    table: {
        noData: "Nessun record trovato",
        loading: "Caricamento...",
    },
    footer: {
        copyright: "© {0} stellantisMarketing Digitale",
    },
    preview: {
        error: "Questa operazione non è consentita in modalità anteprima.",
    }
};

export default it;
