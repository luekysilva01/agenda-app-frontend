export type Language = "en" | "pt";

export interface Translations {
  common: {
    appName: string;
    tagline: string;
    loading: string;
    saving: string;
    save: string;
    saved: string;
    cancel: string;
    edit: string;
    delete: string;
    confirm: string;
    close: string;
    copy: string;
    copied: string;
    back: string;
    backToDashboard: string;
    backToHome: string;
    actions: string;
    status: string;
    date: string;
    time: string;
    duration: string;
    minutes: string;
    service: string;
    client: string;
    phone: string;
    email: string;
    notes: string;
    notesPlaceholder: string;
    all: string;
    active: string;
    paused: string;
    today: string;
    online: string;
    inPerson: string;
    realTime: string;
    sync: string;
    syncing: string;
    synced: string;
    search: string;
    exportCsv: string;
    exportJson: string;
    verified: string;
    total: string;
    statusConfirmed: string;
    statusCompleted: string;
    statusCancelled: string;
    statusNoShow: string;
    days: {
      Monday: string;
      Tuesday: string;
      Wednesday: string;
      Thursday: string;
      Friday: string;
      Saturday: string;
      Sunday: string;
    };
    daysShort: {
      Sun: string;
      Mon: string;
      Tue: string;
      Wed: string;
      Thu: string;
      Fri: string;
      Sat: string;
    };
    months: string[];
    language: string;
    english: string;
    portuguese: string;
    switchLanguage: string;
  };
  navbar: {
    mural: string;
    howItWorks: string;
    demo: string;
    features: string;
    calendar: string;
    faq: string;
    login: string;
    signupWithGoogle: string;
    dashboard: string;
    logout: string;
    openMenu: string;
    closeMenu: string;
    myAccount: string;
    badge: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    socialProof: string;
    ratingText: string;
    badgeFlexible: string;
    badgeInstant: string;
    badgeNoApp: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step1Highlight: string;
    step2Title: string;
    step2Desc: string;
    step2Highlight: string;
    step3Title: string;
    step3Desc: string;
    step3Highlight: string;
  };
  googleSync: {
    badge: string;
    title: string;
    subtitle: string;
    bullet1Title: string;
    bullet1Desc: string;
    bullet2Title: string;
    bullet2Desc: string;
    bullet3Title: string;
    bullet3Desc: string;
    cta: string;
    cardTitle: string;
    cardSubtitle: string;
    liveBadge: string;
    event1Title: string;
    event1Subtitle: string;
    event2Title: string;
    event2Subtitle: string;
    event3Title: string;
    event3Subtitle: string;
    pauseLabel: string;
    complianceBadge: string;
    zeroConflicts: string;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;
    f4Title: string;
    f4Desc: string;
    f5Title: string;
    f5Desc: string;
    f6Title: string;
    f6Desc: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  mural: {
    badge: string;
    title: string;
    subtitle: string;
    allSpecialists: string;
    health: string;
    psychology: string;
    law: string;
    consulting: string;
    design: string;
    bookNow: string;
    nextSlot: string;
    reviews: string;
    format: string;
    duration: string;
    investment: string;
    firstSlot: string;
    modalCta: string;
    modalSub: string;
    bannerTitle: string;
    bannerDesc: string;
    bannerCta: string;
  };
  demo: {
    browserUrl: string;
    liveAvailability: string;
    businessTitle: string;
    businessCategory: string;
    selectedService: string;
    serviceName: string;
    serviceDuration: string;
    serviceMode: string;
    serviceDesc: string;
    step1Date: string;
    step2Slot: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    submitButton: string;
    confirmedTitle: string;
    confirmedDesc: string;
    clientLabel: string;
    dateLabel: string;
    atTime: string;
    resetButton: string;
  };
  cta: {
    badge: string;
    title: string;
    subtitle: string;
    button: string;
    badgeGoogle: string;
    badgeSetup: string;
    badgeActive: string;
  };
  footer: {
    brandDesc: string;
    howItWorks: string;
    features: string;
    calendar: string;
    faq: string;
    login: string;
    rights: string;
    privacyPolicy: string;
    termsOfService: string;
    oauthBadge: string;
  };
  cookieConsent: {
    title: string;
    badge: string;
    desc: string;
    privacyLink: string;
    termsLink: string;
    preferences: string;
    essentialOnly: string;
    acceptAll: string;
    modalTitle: string;
    modalDesc: string;
    c1Title: string;
    c1Badge: string;
    c1Desc: string;
    c2Title: string;
    c2Desc: string;
    c3Title: string;
    c3Desc: string;
    rejectOptional: string;
    savePreferences: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    loginWithGoogle: string;
    authenticating: string;
    googleIdentityBadge: string;
    governanceTitle: string;
    ssoFeature: string;
    lgpdFeature: string;
    tlsFeature: string;
    noAccountPrompt: string;
    requestAccess: string;
    signupTitle: string;
    signupSubtitle: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    agreeTermsText: string;
    signupWithGoogle: string;
    creatingAccount: string;
    noPasswordBadge: string;
    alreadyHaveAccount: string;
    loginAction: string;
  };
  dashboard: {
    loadingTitle: string;
    loadingSubtitle: string;
    greetingMorning: string;
    greetingAfternoon: string;
    greetingEvening: string;
    connectedBadge: string;
    specialistDefault: string;
    hasAppointmentsHeading: string;
    noAppointmentsHeading: string;
    bannerDesc: string;
    copyLinkSuccess: string;
    copyLinkDesc: string;
    nextAppointmentTitle: string;
    confirmedSlot: string;
    freeScheduleTitle: string;
    freeScheduleDesc: string;
    viewDetails: string;
    manualBooking: string;
    proBadge: string;
    tipBadge: string;
    tipTitle: string;
    tipDesc: string;
    tipAction: string;
    tipAutomated: string;
    statToday: string;
    statTodayActive: string;
    statTotal: string;
    statSynced: string;
    statAttendance: string;
    statCompleted: string;
    statHighRate: string;
    statServices: string;
    statManage: string;
    statEffectiveness: string;
    tabCalendar: string;
    tabTable: string;
    tabServices: string;
    syncData: string;
    inspirationTitle: string;
    inspirationDesc: string;
    inspirationAction: string;
    publicPage: string;
    copyLink: string;
    googleCalendar: string;
    realTimeSync: string;
    proPanel: string;
    mainMenu: string;
    navOverview: string;
    navServices: string;
    navAvailability: string;
    navSettings: string;
    navNewAppointment: string;
    publicLinkTitle: string;
    signOut: string;
    signedOutToast: string;
    syncSuccessToast: string;
    syncErrorToast: string;
  };
  calendarView: {
    today: string;
    prevMonth: string;
    nextMonth: string;
    appointmentsCount: string;
    emptyDayTitle: string;
    emptyDayDesc: string;
    scheduleThisDay: string;
    newBooking: string;
    viewDetails: string;
  };
  tableView: {
    searchPlaceholder: string;
    allFilter: string;
    confirmedFilter: string;
    completedFilter: string;
    cancelledFilter: string;
    exportCsv: string;
    colClient: string;
    colService: string;
    colDuration: string;
    colDateTime: string;
    colStatus: string;
    colActions: string;
    emptyTitle: string;
    emptyDesc: string;
    viewDetails: string;
    exportSuccess: string;
    exportEmpty: string;
  };
  newAppointment: {
    breadcrumbNew: string;
    title: string;
    subtitle: string;
    serviceTypeLabel: string;
    noServicesRegistered: string;
    registerServicesLink: string;
    clientDataTitle: string;
    clientNameLabel: string;
    clientNamePlaceholder: string;
    clientPhoneLabel: string;
    clientPhonePlaceholder: string;
    clientEmailLabel: string;
    clientEmailPlaceholder: string;
    dateTimeTitle: string;
    selectedDateLabel: string;
    timeLabel: string;
    internalNotesLabel: string;
    internalNotesPlaceholder: string;
    summaryTitle: string;
    newBadge: string;
    googleSyncNoteTitle: string;
    googleSyncNoteDesc: string;
    consentCheckbox: string;
    creating: string;
    confirmAndSave: string;
    cancelAndReturn: string;
    successToast: string;
    errorToast: string;
  };
  appointmentDetail: {
    recordBadge: string;
    clientFile: string;
    callClient: string;
    editReschedule: string;
    complete: string;
    notesTitle: string;
    emptyNotes: string;
    quickStatusTitle: string;
    actionsTitle: string;
    anonymizeLgpd: string;
    deletePermanent: string;
    confirmDelete: string;
    confirmCancel: string;
    confirmAnonymize: string;
    anonymizeSuccess: string;
    deleteSuccess: string;
    createdOn: string;
    notFound: string;
    loading: string;
    callPhone: string;
    sendEmail: string;
    editModalTitle: string;
  };
  availability: {
    title: string;
    subtitle: string;
    googleConnected: string;
    daysTitle: string;
    daysDesc: string;
    daysActive: string;
    dayActive: string;
    activeStatus: string;
    closedStatus: string;
    hoursTitle: string;
    hoursDesc: string;
    startHour: string;
    endHour: string;
    sessionDuration: string;
    breakInterval: string;
    noBreak: string;
    breakMinutes: string;
    rulesTitle: string;
    rule1Title: string;
    rule1Desc: string;
    rule2Title: string;
    rule2Desc: string;
    saveButton: string;
    saveSuccess: string;
  };
  services: {
    title: string;
    subtitle: string;
    newService: string;
    searchPlaceholder: string;
    totalItems: string;
    createTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    categoryLabel: string;
    categoryPlaceholder: string;
    durationLabel: string;
    instructionsLabel: string;
    instructionsPlaceholder: string;
    saveService: string;
    editServiceTitle: string;
    emptyTitle: string;
    emptyDesc: string;
    createFirst: string;
    availableBadge: string;
    pausedBadge: string;
    publicPageNotice: string;
    configureAction: string;
    confirmDelete: string;
    createSuccess: string;
    updateSuccess: string;
    deleteSuccess: string;
  };
  settings: {
    title: string;
    subtitle: string;
    tabProfile: string;
    tabGoogle: string;
    tabNotifications: string;
    tabSecurity: string;
    tabLgpd: string;
    tabLanguage: string;
    publicUrlTitle: string;
    profileSectionTitle: string;
    profileSectionDesc: string;
    fullName: string;
    corporateEmail: string;
    roleSpecialty: string;
    rolePlaceholder: string;
    organization: string;
    organizationPlaceholder: string;
    languagePreferenceTitle: string;
    languagePreferenceDesc: string;
    googleConnectionTitle: string;
    googleConnectionDesc: string;
    idProvider: string;
    googleAccount: string;
    verificationStatus: string;
    officiallyVerified: string;
    dataProtectionTitle: string;
    dataProtectionDesc: string;
    notificationsTitle: string;
    notificationsDesc: string;
    emailAlertsLabel: string;
    emailAlertsDesc: string;
    sessionsTitle: string;
    sessionsDesc: string;
    currentSessionTitle: string;
    currentSessionDesc: string;
    signOutAll: string;
    lgpdTitle: string;
    lgpdDesc: string;
    portabilityTitle: string;
    portabilityDesc: string;
    exportButton: string;
    consentTitle: string;
    consentDesc: string;
    dpoTitle: string;
    dpoDesc: string;
    dpoEmail: string;
    deletionTitle: string;
    deletionDesc: string;
    deleteAccountButton: string;
    deletePrompt: string;
    saveChanges: string;
    saveSuccess: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      appName: "R3uno",
      tagline: "Smart & Simple Online Scheduling",
      loading: "Loading...",
      saving: "Saving...",
      save: "Save",
      saved: "Saved",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      confirm: "Confirm",
      close: "Close",
      copy: "Copy",
      copied: "Copied!",
      back: "Back",
      backToDashboard: "Back to Dashboard",
      backToHome: "Back to Home",
      actions: "Actions",
      status: "Status",
      date: "Date",
      time: "Time",
      duration: "Duration",
      minutes: "min",
      service: "Service",
      client: "Client",
      phone: "Phone",
      email: "Email",
      notes: "Notes",
      notesPlaceholder: "Add internal notes or instructions...",
      all: "All",
      active: "Active",
      paused: "Paused",
      today: "Today",
      online: "Online",
      inPerson: "In-Person",
      realTime: "Real-time",
      sync: "Sync",
      syncing: "Syncing...",
      synced: "Synced",
      search: "Search",
      exportCsv: "Export CSV",
      exportJson: "Export JSON",
      verified: "Verified",
      total: "Total",
      statusConfirmed: "Confirmed",
      statusCompleted: "Completed",
      statusCancelled: "Canceled", // American English single 'l'
      statusNoShow: "No Show",
      days: {
        Monday: "Monday",
        Tuesday: "Tuesday",
        Wednesday: "Wednesday",
        Thursday: "Thursday",
        Friday: "Friday",
        Saturday: "Saturday",
        Sunday: "Sunday",
      },
      daysShort: {
        Sun: "Sun",
        Mon: "Mon",
        Tue: "Tue",
        Wed: "Wed",
        Thu: "Thu",
        Fri: "Fri",
        Sat: "Sat",
      },
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      language: "Language",
      english: "English (US)",
      portuguese: "Português (BR)",
      switchLanguage: "Change Language",
    },
    navbar: {
      mural: "Showcase",
      howItWorks: "How It Works",
      demo: "Demo",
      features: "Features",
      calendar: "Schedule",
      faq: "FAQ",
      login: "Sign In",
      signupWithGoogle: "Start with Google",
      dashboard: "Dashboard",
      logout: "Sign Out",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      myAccount: "My Account",
      badge: "Scheduling",
    },
    hero: {
      badge: "Simple & Smart Online Scheduling",
      title: "Effortless, rapid scheduling synced to your workflow.",
      subtitle:
        "Built for consultants, attorneys, healthcare providers, therapists, executive coaches, and businesses of every size. Share your custom booking link and manage all appointments in real time.",
      ctaPrimary: "Get Started with Google",
      ctaSecondary: "View Interactive Demo",
      socialProof: "4.9 / 5",
      ratingText: "Over 1,400 active professionals and experts",
      badgeFlexible: "100% Flexible Schedule",
      badgeInstant: "Instant Confirmation",
      badgeNoApp: "No App Download Required",
    },
    howItWorks: {
      badge: "Step by Step",
      title: "How scheduling works on R3uno",
      subtitle:
        'Eliminate the endless back-and-forth emails asking "what time works best for you?". Three simple steps to modernize your bookings.',
      step1Title: "Create your Account in Seconds",
      step1Desc:
        "Sign up in seconds to access your professional dashboard and publish your custom booking page.",
      step1Highlight: "Instant setup",
      step2Title: "Set Hours & Buffer Breaks",
      step2Desc:
        "Configure your operating days, office hours, appointment lengths, and automated buffer pauses between sessions.",
      step2Highlight: "Complete schedule control",
      step3Title: "Share your Personalized Link",
      step3Desc:
        "Share your personalized link in emails, text messages, social media, or your website. Clients schedule their own slots in seconds with zero friction.",
      step3Highlight: "Direct and seamless booking",
    },
    googleSync: {
      badge: "Smart Calendar Management",
      title: "Total real-time control over your bookings and availability.",
      subtitle:
        "Set your working hours and smart buffer pauses between appointments. Clients see only your open slots, and bookings are immediately confirmed in your schedule.",
      bullet1Title: "Automated Conflict Prevention",
      bullet1Desc:
        "Booked slots are instantly blocked across your schedule to prevent any double-booking.",
      bullet2Title: "Smart Buffer Breaks",
      bullet2Desc:
        "Automated 10, 15, or 30-minute intervals between sessions to eliminate delays and give you breathing room.",
      bullet3Title: "Integrated Analytics & Insights",
      bullet3Desc:
        "Track confirmations, cancellations, and attendance rates all in one centralized place.",
      cta: "Create Free Account",
      cardTitle: "Daily Agenda",
      cardSubtitle: "Status: Active Real-time Bookings",
      liveBadge: "Real-time",
      event1Title: "09:00 AM - 09:45 AM • Consulting Session",
      event1Subtitle: "Booked via public link (Confirmed)",
      event2Title: "10:00 AM - 10:15 AM • Buffer Break",
      event2Subtitle: "Automated pause between appointments",
      event3Title: "02:00 PM - 02:45 PM • 1-on-1 Strategy Meeting",
      event3Subtitle: "Booked via public link (Confirmed)",
      pauseLabel: "Break",
      complianceBadge: "GDPR & Privacy Compliant",
      zeroConflicts: "Zero Conflicts",
    },
    features: {
      badge: "Everything You Need",
      title: "Designed to simplify your professional routine",
      subtitle:
        "No complex clutter or steep learning curves. The essential tools for professionals who value their time and brand.",
      f1Title: "24/7 Online Booking",
      f1Desc:
        "Clients choose open slots with complete autonomy through your direct link, eliminating manual texting.",
      f2Title: "Instant Calendar Confirmation",
      f2Desc:
        "Scheduled appointments immediately appear on your dashboard and lock against duplicates.",
      f3Title: "Buffer Times & Breaks",
      f3Desc:
        "Set automatic 10, 15, or 30-minute rest intervals between meetings. Never run behind again.",
      f4Title: "Service & Offerings Catalog",
      f4Desc:
        "Create custom services with specific durations, categories, detailed descriptions, and client guidelines.",
      f5Title: "Flexible Working Hours",
      f5Desc:
        "Customize operating days, opening and closing hours, and standard session duration.",
      f6Title: "Secure Access & Data Privacy",
      f6Desc:
        "Protected authentication via Google OAuth, strict privacy controls, and full regulatory compliance.",
    },
    faq: {
      badge: "Frequently Asked Questions",
      title: "Common questions about the platform",
      subtitle:
        "Clear and direct answers on how our online scheduling platform works.",
      items: [
        {
          question: "Does this system work for my specific industry?",
          answer:
            "Yes! R3uno was engineered to be 100% flexible across industries: physicians, psychologists, attorneys, business consultants, therapists, dietitians, beauty specialists, architects, tutors, and independent professionals.",
        },
        {
          question: "How does schedule control and calendar management work?",
          answer:
            "You set your operating days and working hours in your dashboard. When a client selects a time on your public page, that slot is instantly reserved and locked, preventing any overlapping bookings.",
        },
        {
          question: "What is a Buffer Break between appointments?",
          answer:
            "It is a customizable pause (such as 10, 15, or 30 minutes) automatically inserted between appointments. It ensures back-to-back clients never overlap, giving you time to prepare, review notes, and stay on schedule.",
        },
        {
          question: "Do my clients need to install an app or create an account?",
          answer:
            "No! Clients access your link directly through their mobile or desktop browser, select an available date and time, enter their name and phone number, and confirm with 1 click without any friction.",
        },
        {
          question: "Can I offer different service types and durations?",
          answer:
            "Yes! You can set up multiple services with custom lengths (e.g., 15 min, 30 min, 45 min, 60 min, 90 min), categories, descriptions, and specific preparation guidelines for each.",
        },
        {
          question: "How do I get started?",
          answer:
            "Simply sign in with your Google account, configure your availability hours, and your exclusive booking link will be live and ready to share in under 1 minute.",
        },
      ],
    },
    mural: {
      badge: "R3uno Specialist Showcase",
      title: "See who is already mastering their time with R3uno.",
      subtitle:
        "Browse our showcase of public booking pages. See how leading professionals from diverse fields provide a sleek, visual, and connected booking experience.",
      allSpecialists: "✨ All Specialists",
      health: "🩺 Healthcare & Medicine",
      psychology: "🧠 Psychology & Therapy",
      law: "⚖️ Law & Legal",
      consulting: "📊 Consulting & Business",
      design: "📐 Architecture & Design",
      bookNow: "Book",
      nextSlot: "Next available",
      reviews: "reviews",
      format: "Format:",
      duration: "Avg. Duration:",
      investment: "Pricing:",
      firstSlot: "Earliest slot:",
      modalCta: "Create My Own Page Like This",
      modalSub: "Launch your professional booking page in 1 minute with Google.",
      bannerTitle: "Your public booking page, polished and effortless.",
      bannerDesc:
        "Enjoy an elegant page featuring your photo, specialties, guidelines, and real-time slots synced directly with your professional schedule.",
      bannerCta: "Start My Free Page",
    },
    demo: {
      browserUrl: "r3uno.app/your-calendar",
      liveAvailability: "Live Availability",
      businessTitle: "Professional / Business",
      businessCategory: "Consulting & Services",
      selectedService: "Selected Service:",
      serviceName: "Consulting / Strategy Session",
      serviceDuration: "45 minutes",
      serviceMode: "Custom Session",
      serviceDesc:
        "Select the best available date and time. Once confirmed, the slot is immediately locked on the calendar with automated buffer protection.",
      step1Date: "1. Select a Date",
      step2Slot: "2. Select a Time Slot",
      nameLabel: "Your Name *",
      namePlaceholder: "Alex Morgan",
      phoneLabel: "Your Phone / Cell *",
      phonePlaceholder: "+1 (555) 123-4567",
      submitButton: "Confirm Booking in 1 Click",
      confirmedTitle: "Booking Confirmed!",
      confirmedDesc:
        "Your appointment has been successfully scheduled and added to the calendar.",
      clientLabel: "Client:",
      dateLabel: "Date & Time:",
      atTime: "at",
      resetButton: "Try Another Booking",
    },
    cta: {
      badge: "Get Started Now",
      title: "Ready to streamline your scheduling routine?",
      subtitle:
        "Create your unique booking link, configure your availability windows, and start receiving reservations today.",
      button: "Create My Free Account",
      badgeGoogle: "Secure Google Connection",
      badgeSetup: "1-Minute Setup",
      badgeActive: "Instant Activation",
    },
    footer: {
      brandDesc:
        "Streamlined online booking and calendar management platform for modern professionals.",
      howItWorks: "How It Works",
      features: "Features",
      calendar: "Schedule",
      faq: "FAQ",
      login: "Sign In",
      rights: "R3uno Technologies. All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      oauthBadge: "Google Workspace OAuth 2.0",
    },
    cookieConsent: {
      title: "Privacy & Cookies",
      badge: "Data Protection",
      desc: "We use cookies and secure technologies for authentication, real-time calendar synchronization, and to enhance your experience in compliance with our",
      privacyLink: "Privacy Policy",
      termsLink: "Terms of Service",
      preferences: "Preferences",
      essentialOnly: "Essential Only",
      acceptAll: "Accept All",
      modalTitle: "Cookie & Data Privacy Preferences",
      modalDesc:
        "We respect your privacy and guarantee full control over how your information is processed. Choose which cookie categories you authorize:",
      c1Title: "1. Essential Cookies & Authentication",
      c1Badge: "Always Active",
      c1Desc:
        "Required for fundamental platform operations, secure sessions, authentication, and appointment integrity.",
      c2Title: "2. Performance & Analytics Cookies",
      c2Desc:
        "Enable aggregated metrics regarding platform speed, stability, and usage for ongoing optimization.",
      c3Title: "3. Functionality & Preference Cookies",
      c3Desc:
        "Save your display settings, filter preferences, and appointment notification choices.",
      rejectOptional: "Reject Optional",
      savePreferences: "Save Preferences",
    },
    auth: {
      loginTitle: "Corporate Sign In",
      loginSubtitle:
        "Unified access with Google Workspace or your professional Google account.",
      loginWithGoogle: "Sign in with Google",
      authenticating: "Validating corporate credentials...",
      googleIdentityBadge: "Unified authentication via Google Identity",
      governanceTitle: "Security & Governance Standards",
      ssoFeature:
        "Single Sign-On (SSO): Passwordless access protected by Google MFA.",
      lgpdFeature:
        "Compliance & Privacy: Complete regulatory compliance with GDPR and international data standards.",
      tlsFeature:
        "TLS 1.3 Encryption: End-to-end encrypted data transmission.",
      noAccountPrompt: "Don't have an active account yet?",
      requestAccess: "Request Professional Access",
      signupTitle: "Create Professional Account",
      signupSubtitle:
        "Set up your automated scheduling infrastructure with seamless Google account authentication.",
      pillar1Title: "Flexible Hours",
      pillar1Desc: "Total control over operating days and working hours.",
      pillar2Title: "Zero Conflicts",
      pillar2Desc: "Automated prevention against duplicate bookings.",
      pillar3Title: "Buffer Breaks",
      pillar3Desc: "Automatic breathing room between client sessions.",
      agreeTermsText: "I have read and agree to the",
      signupWithGoogle: "Get Started with Google",
      creatingAccount: "Creating account with Google...",
      noPasswordBadge: "Immediate configuration with no manual passwords needed",
      alreadyHaveAccount: "Already have an account?",
      loginAction: "Sign in with Google",
    },
    dashboard: {
      loadingTitle: "Loading appointment dashboard...",
      loadingSubtitle: "Synchronizing with your Google Account",
      greetingMorning: "Good morning",
      greetingAfternoon: "Good afternoon",
      greetingEvening: "Good evening",
      connectedBadge: "Dashboard Connected",
      specialistDefault: "Specialist",
      hasAppointmentsHeading: "You have",
      noAppointmentsHeading: "Your schedule is free for new bookings today.",
      bannerDesc:
        "All appointments booked by your clients are updated in real time on your dashboard. Share your exclusive link to receive new bookings effortlessly.",
      copyLinkSuccess: "Public link copied!",
      copyLinkDesc:
        "Share this link with clients so they can book directly onto your calendar.",
      nextAppointmentTitle: "Next Scheduled Appointment",
      confirmedSlot: "Confirmed Slot",
      freeScheduleTitle: "Schedule clear for the coming hours",
      freeScheduleDesc:
        "Your schedule availability is active. New bookings made by your clients will appear here automatically.",
      viewDetails: "View Appointment Details",
      manualBooking: "Manual Appointment Booking",
      proBadge: "PRO",
      tipBadge: "R3uno Optimization Tip",
      tipTitle: "Customize your Buffer Breaks",
      tipDesc:
        "Enable automatic 10 or 15-minute breaks between sessions to grab coffee, review notes, and avoid cascading delays.",
      tipAction: "Adjust pause rules",
      tipAutomated: "100% Automated",
      statToday: "Today's Appointments",
      statTodayActive: "scheduled today",
      statTotal: "Total Bookings",
      statSynced: "Booking history",
      statAttendance: "Attendance Rate",
      statCompleted: "completed",
      statHighRate: "High Rate",
      statServices: "Active Services",
      statManage: "Manage",
      statEffectiveness: "effectiveness",
      tabCalendar: "Interactive Calendar",
      tabTable: "Appointments List",
      tabServices: "Service Catalog",
      syncData: "Sync Data",
      inspirationTitle: "Organize your availability and services",
      inspirationDesc:
        "Define your working hours and customize your service catalog so your clients can easily book available time slots.",
      inspirationAction: "Configure Availability",
      publicPage: "Public Page",
      copyLink: "Copy Link",
      googleCalendar: "Google Account",
      realTimeSync: "Real-time",
      proPanel: "Professional Panel",
      mainMenu: "Main Menu",
      navOverview: "Overview",
      navServices: "Services",
      navAvailability: "Availability",
      navSettings: "Settings & Privacy",
      navNewAppointment: "New Appointment",
      publicLinkTitle: "Public Link",
      signOut: "Sign Out",
      signedOutToast: "You have been signed out.",
      syncSuccessToast: "Dashboard data synchronized!",
      syncErrorToast: "Error updating dashboard data.",
    },
    calendarView: {
      today: "Today",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      appointmentsCount: "appointment",
      emptyDayTitle: "No appointments scheduled for this day.",
      emptyDayDesc:
        "Your schedule is open on this date. You can add a manual booking or wait for bookings via your public link.",
      scheduleThisDay: "Schedule on this Day",
      newBooking: "Book Slot",
      viewDetails: "View details",
    },
    tableView: {
      searchPlaceholder: "Search by client, phone, email, or service...",
      allFilter: "All",
      confirmedFilter: "Confirmed",
      completedFilter: "Completed",
      cancelledFilter: "Canceled",
      exportCsv: "Export CSV",
      colClient: "Client / Contact",
      colService: "Service / Appointment",
      colDuration: "Duration",
      colDateTime: "Date & Time",
      colStatus: "Status",
      colActions: "Actions",
      emptyTitle: "No appointments found.",
      emptyDesc: "Try adjusting your search terms or filter by another status.",
      viewDetails: "View Details",
      exportSuccess: "CSV report exported successfully!",
      exportEmpty: "No records to export.",
    },
    newAppointment: {
      breadcrumbNew: "New Appointment",
      title: "Schedule New Appointment",
      subtitle:
        "Enter client details, select the service, and book the slot directly onto your calendar.",
      serviceTypeLabel: "Service Type / Offering *",
      noServicesRegistered: "No services registered yet.",
      registerServicesLink: "Register services in the catalog",
      clientDataTitle: "Client Details:",
      clientNameLabel: "Full Name *",
      clientNamePlaceholder: "e.g., Alex Johnson",
      clientPhoneLabel: "Phone / Cell *",
      clientPhonePlaceholder: "+1 (555) 234-5678",
      clientEmailLabel: "Email (Optional)",
      clientEmailPlaceholder: "client@example.com",
      dateTimeTitle: "Date & Time:",
      selectedDateLabel: "Selected Date:",
      timeLabel: "Time Slot:",
      internalNotesLabel: "Internal Notes / Guidelines:",
      internalNotesPlaceholder:
        "e.g., First consultation, scope alignment, prep instructions...",
      summaryTitle: "Booking Summary",
      newBadge: "New",
      googleSyncNoteTitle: "Immediate Calendar Protection",
      googleSyncNoteDesc:
        "The appointment will be registered instantly in your dashboard, reserving the time slot and preventing double bookings.",
      consentCheckbox:
        "I confirm that the client consented to the processing of contact information for appointment confirmation pursuant to the",
      creating: "Creating Appointment...",
      confirmAndSave: "Confirm & Save to Calendar",
      cancelAndReturn: "← Cancel and Return",
      successToast: "Appointment created successfully!",
      errorToast: "Error creating appointment",
    },
    appointmentDetail: {
      recordBadge: "Appointment Record",
      clientFile: "Client Profile",
      callClient: "Call Client",
      editReschedule: "Edit / Reschedule",
      complete: "Complete",
      notesTitle: "Session Notes / History",
      emptyNotes: "No internal notes recorded for this appointment.",
      quickStatusTitle: "Quick Status Update",
      actionsTitle: "Actions",
      anonymizeLgpd: "Anonymize Client Data (Privacy)",
      deletePermanent: "Permanently Delete Record",
      confirmDelete:
        "Are you sure you want to permanently delete this appointment record?",
      confirmCancel: "Are you sure you want to cancel this appointment?",
      confirmAnonymize:
        "Are you sure you want to anonymize this client's personal data? Name, phone number, and notes will be sanitized while preserving statistical metrics.",
      anonymizeSuccess: "Client data anonymized successfully!",
      deleteSuccess: "Record deleted successfully.",
      createdOn: "Created on",
      notFound: "Appointment not found or unavailable.",
      loading: "Loading appointment details...",
      callPhone: "Call client",
      sendEmail: "Send direct email",
      editModalTitle: "Edit Appointment / Reschedule",
    },
    availability: {
      title: "Availability & Working Hours",
      subtitle:
        "Configure active working days, opening and closing hours, default session length, and automated buffer pauses to prevent burnout.",
      googleConnected: "Google Account Connected",
      daysTitle: "Active Operating Days",
      daysDesc: "Select the days available for bookings on your public link.",
      daysActive: "active days",
      dayActive: "active day",
      activeStatus: "Active",
      closedStatus: "Closed",
      hoursTitle: "Working Hours & Buffer Breaks",
      hoursDesc:
        "Define your daily booking window and the rest pause between appointments.",
      startHour: "Office Opening Time",
      endHour: "Office Closing Time",
      sessionDuration: "Appointment Length",
      breakInterval: "Buffer Break Between Sessions",
      noBreak: "No break (back-to-back)",
      breakMinutes: "minutes break",
      rulesTitle: "Smart Scheduling & Protection Rules",
      rule1Title: "Automated Double-Booking Prevention",
      rule1Desc:
        "When an appointment is confirmed, that time slot is immediately locked on your schedule to eliminate scheduling conflicts.",
      rule2Title: "Buffer Rest Interval",
      rule2Desc:
        "Custom pause intervals are automatically applied between sessions so you can prepare for your next client without rushing.",
      saveButton: "Save Availability Preferences",
      saveSuccess: "Working hours and buffer preferences saved successfully!",
    },
    services: {
      title: "Service Catalog",
      subtitle:
        "Manage appointment types, strategy sessions, and consultations with tailored lengths and client guidance.",
      newService: "New Service",
      searchPlaceholder: "Search by service, category, or description...",
      totalItems: "Total items:",
      createTitle: "Register New Service / Appointment Type",
      nameLabel: "Service / Appointment Name *",
      namePlaceholder:
        "e.g., Strategic Consultation / Initial Evaluation",
      categoryLabel: "Category",
      categoryPlaceholder: "e.g., Consulting & Business",
      durationLabel: "Estimated Duration",
      instructionsLabel: "Client Instructions & Description",
      instructionsPlaceholder:
        "e.g., Please arrive 5 minutes early / Meeting link will be emailed...",
      saveService: "Save Service",
      editServiceTitle: "Edit Service / Appointment Type",
      emptyTitle: "No services found.",
      emptyDesc:
        "Add new services or adjust your search filters to display items.",
      createFirst: "Register First Service",
      availableBadge: "Available",
      pausedBadge: "Paused",
      publicPageNotice: "Available on public link",
      configureAction: "Configure →",
      confirmDelete: "Are you sure you want to delete this service?",
      createSuccess: "New service created successfully!",
      updateSuccess: "Service updated successfully!",
      deleteSuccess: "Service deleted successfully.",
    },
    settings: {
      title: "Account Settings",
      subtitle:
        "Manage your professional profile, single sign-on connections, notifications, and privacy compliance.",
      tabProfile: "Professional Profile",
      tabGoogle: "Google Workspace SSO",
      tabNotifications: "Notifications",
      tabSecurity: "Security & Sessions",
      tabLgpd: "Privacy & Data Rights",
      tabLanguage: "Language / Idioma",
      publicUrlTitle: "Your Public Booking Link",
      profileSectionTitle: "Profile & Professional Information",
      profileSectionDesc:
        "This information is displayed to clients on your public scheduling page and in booking confirmations.",
      fullName: "Full Name *",
      corporateEmail: "Corporate Email (Google SSO)",
      roleSpecialty: "Job Title / Specialty",
      rolePlaceholder:
        "e.g., Strategic Consultant, Attorney, Psychologist, Specialist...",
      organization: "Organization / Company / Practice",
      organizationPlaceholder:
        "e.g., Studio & Associates, Corporate Legal, Medical Clinic...",
      languagePreferenceTitle: "Language Preference / Preferência de Idioma",
      languagePreferenceDesc:
        "Choose your preferred interface language. Changes take effect instantly across all pages.",
      googleConnectionTitle: "Google Workspace SSO & Authentication",
      googleConnectionDesc:
        "Your login is securely managed via Google OAuth 2.0 protocol.",
      idProvider: "Identity Provider:",
      googleAccount: "Linked Google Account:",
      verificationStatus: "Verification Status:",
      officiallyVerified: "Officially Verified",
      dataProtectionTitle: "Data Protection & Governance",
      dataProtectionDesc:
        "All sessions and credentials adhere to strict security standards, using RSA-256 tokens and tenant isolation.",
      notificationsTitle: "Email Notifications",
      notificationsDesc:
        "Configure operational alerts and reminders for your scheduling calendar.",
      emailAlertsLabel: "New Booking & Cancellation Alerts",
      emailAlertsDesc:
        "Receive immediate notifications whenever a client books or cancels an appointment.",
      sessionsTitle: "Active Sessions & Account Security",
      sessionsDesc: "Monitor your authentication status and active browser sessions.",
      currentSessionTitle: "Current Browser Session",
      currentSessionDesc: "Authenticated via Google Single Sign-On",
      signOutAll: "Sign Out of All Active Sessions",
      lgpdTitle: "Privacy & Regulatory Rights Center",
      lgpdDesc:
        "Manage data portability, consent preferences, anonymization, and contact the Data Protection Officer (DPO).",
      portabilityTitle: "Personal Data Portability",
      portabilityDesc:
        "Export your full data dossier, service catalog, and appointment records in structured JSON format.",
      exportButton: "Export My Data (JSON)",
      consentTitle: "Consent & Terms of Service",
      consentDesc:
        "Electronic consent recorded upon federated Google OAuth 2.0 authentication.",
      dpoTitle: "Data Protection Officer (DPO)",
      dpoDesc:
        "Official channel for data subject requests, legal inquiries, and formal notices.",
      dpoEmail: "dpo@r3uno.app",
      deletionTitle: "Account Deletion & Anonymization",
      deletionDesc:
        "Request permanent account closure and anonymization of your data pursuant to applicable privacy laws.",
      deleteAccountButton: "Delete Account & Data",
      deletePrompt:
        'Type "DELETE" to permanently delete your account and anonymize all appointment records:',
      saveChanges: "Save Settings",
      saveSuccess: "Settings saved successfully!",
    },
  },
  pt: {
    common: {
      appName: "R3uno",
      tagline: "Sistema de Agendamento Online Simples e Inteligente",
      loading: "Carregando...",
      saving: "Salvando...",
      save: "Salvar",
      saved: "Salvo",
      cancel: "Cancelar",
      edit: "Editar",
      delete: "Excluir",
      confirm: "Confirmar",
      close: "Fechar",
      copy: "Copiar",
      copied: "Copiado!",
      back: "Voltar",
      backToDashboard: "Voltar ao Painel",
      backToHome: "Voltar ao Início",
      actions: "Ações",
      status: "Status",
      date: "Data",
      time: "Horário",
      duration: "Duração",
      minutes: "min",
      service: "Serviço",
      client: "Cliente",
      phone: "Telefone",
      email: "E-mail",
      notes: "Observações",
      notesPlaceholder: "Adicione observações internas ou orientações...",
      all: "Todos",
      active: "Ativo",
      paused: "Pausado",
      today: "Hoje",
      online: "Online",
      inPerson: "Presencial",
      realTime: "Tempo Real",
      sync: "Sincronizar",
      syncing: "Sincronizando...",
      synced: "Sincronizado",
      search: "Buscar",
      exportCsv: "Exportar CSV",
      exportJson: "Exportar JSON",
      verified: "Verificado",
      total: "Total",
      statusConfirmed: "Confirmado",
      statusCompleted: "Concluído",
      statusCancelled: "Cancelado",
      statusNoShow: "Não compareceu",
      days: {
        Monday: "Segunda-feira",
        Tuesday: "Terça-feira",
        Wednesday: "Quarta-feira",
        Thursday: "Quinta-feira",
        Friday: "Sexta-feira",
        Saturday: "Sábado",
        Sunday: "Domingo",
      },
      daysShort: {
        Sun: "Dom",
        Mon: "Seg",
        Tue: "Ter",
        Wed: "Qua",
        Thu: "Qui",
        Fri: "Sex",
        Sat: "Sáb",
      },
      months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      language: "Idioma",
      english: "English (US)",
      portuguese: "Português (BR)",
      switchLanguage: "Alterar Idioma",
    },
    navbar: {
      mural: "Mural",
      howItWorks: "Como Funciona",
      demo: "Demonstração",
      features: "Recursos",
      calendar: "Agenda",
      faq: "FAQ",
      login: "Entrar",
      signupWithGoogle: "Começar com o Google",
      dashboard: "Painel",
      logout: "Sair",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      myAccount: "Minha Conta",
      badge: "Agendamentos",
    },
    hero: {
      badge: "Agendamento Online Simples e Inteligente",
      title: "Agendamento rápido, sem esforço e conectado à sua rotina.",
      subtitle:
        "Desenvolvido para consultores, advogados, profissionais de saúde, terapeutas, especialistas e profissionais de qualquer segmento. Compartilhe seu link exclusivo e gerencie todos os atendimentos em tempo real.",
      ctaPrimary: "Começar com o Google",
      ctaSecondary: "Ver Demonstração Interativa",
      socialProof: "4.9 / 5",
      ratingText: "Mais de 1.400 profissionais e especialistas ativos",
      badgeFlexible: "Agenda 100% Flexível",
      badgeInstant: "Confirmação Instantânea",
      badgeNoApp: "Sem Instalar Aplicativo",
    },
    howItWorks: {
      badge: "Passo a Passo",
      title: "Como funciona o agendamento no R3uno",
      subtitle:
        'Elimine a troca interminável de mensagens perguntando "qual horário fica bom para você?". Três passos simples para modernizar seus agendamentos.',
      step1Title: "Crie sua Conta em Segundos",
      step1Desc:
        "Cadastre-se rapidamente para acessar seu painel institucional e publicar sua página pública de agendamento.",
      step1Highlight: "Configuração instantânea",
      step2Title: "Defina Horários e Intervalos",
      step2Desc:
        "Configure os dias em que você atende, horários de expediente, durações de serviço e intervalos inteligentes de descanso entre atendimentos.",
      step2Highlight: "Controle total da agenda",
      step3Title: "Compartilhe seu Link Exclusivo",
      step3Desc:
        "Envie seu link (ex: r3uno.app/sua-agenda) em conversas, redes sociais ou no seu site. Os clientes agendam seus próprios horários em segundos, sem atritos.",
      step3Highlight: "Agendamento direto e autônomo",
    },
    googleSync: {
      badge: "Gestão Inteligente de Agenda",
      title: "Controle total dos seus horários e atendimentos em tempo real.",
      subtitle:
        "Defina seu expediente e intervalos de descanso entre atendimentos. Seus clientes visualizam apenas os horários livres, e as reservas entram instantaneamente na sua rotina.",
      bullet1Title: "Prevenção Automática de Conflitos",
      bullet1Desc:
        "Horários reservados são imediatamente bloqueados para evitar sobreposição ou agendamento duplo.",
      bullet2Title: "Intervalos de Respiro Inteligentes",
      bullet2Desc:
        "Pausas automáticas de 10, 15 ou 30 minutos entre consultas para eliminar atrasos e dar fôlego ao seu dia.",
      bullet3Title: "Painel Integrado e Indicadores",
      bullet3Desc:
        "Acompanhe confirmações, cancelamentos e taxa de comparecimento em um único lugar.",
      cta: "Criar Conta Gratuita",
      cardTitle: "Agenda do Dia",
      cardSubtitle: "Status: Agendamentos Ativos em Tempo Real",
      liveBadge: "Tempo Real",
      event1Title: "09:00 - 09:45 • Sessão de Consultoria",
      event1Subtitle: "Agendado via link público (Confirmado)",
      event2Title: "10:00 - 10:15 • Intervalo de Respiro",
      event2Subtitle: "Pausa automática entre atendimentos",
      event3Title: "14:00 - 14:45 • Reunião Estratégica Individual",
      event3Subtitle: "Agendado via link público (Confirmado)",
      pauseLabel: "Pausa",
      complianceBadge: "Conformidade com a LGPD",
      zeroConflicts: "Zero Conflitos",
    },
    features: {
      badge: "Tudo o que Você Precisa",
      title: "Projetado para simplificar sua rotina profissional",
      subtitle:
        "Sem complicações ou curvas de aprendizado longas. As ferramentas certas para quem valoriza seu tempo e sua imagem.",
      f1Title: "Agendamento Online 24/7",
      f1Desc:
        "Seus clientes escolhem horários disponíveis com total autonomia pelo seu link exclusivo, sem troca manual de mensagens.",
      f2Title: "Confirmação Instantânea na Agenda",
      f2Desc:
        "Os horários agendados entram imediatamente no seu painel de controle e são bloqueados contra duplicidade.",
      f3Title: "Intervalos de Respiro e Descanso",
      f3Desc:
        "Configure pausas automáticas de 10, 15 ou 30 minutos entre atendimentos. Chega de atrasos acumulados ao longo do dia.",
      f4Title: "Catálogo de Serviços e Sessões",
      f4Desc:
        "Crie tipos de serviços personalizados com durações específicas, categorias e orientações aos clientes.",
      f5Title: "Expediente e Horários Flexíveis",
      f5Desc:
        "Defina dias de atendimento, horários de início e término e intervalos inteligentes entre atendimentos.",
      f6Title: "Acesso Seguro e Proteção de Dados",
      f6Desc:
        "Autenticação protegida via Google OAuth 2.0, controle estrito de privacidade e conformidade com as normas da LGPD.",
    },
    faq: {
      badge: "Perguntas Frequentes",
      title: "Dúvidas mais comuns sobre a plataforma",
      subtitle:
        "Respostas claras e diretas sobre como funciona o sistema de agendamento online.",
      items: [
        {
          question: "O sistema serve para a minha área ou segmento?",
          answer:
            "Sim! O R3uno foi desenvolvido para ser 100% flexível para qualquer área: médicos, psicólogos, advogados, consultores de negócios, terapeutas, fisioterapeutas, nutricionistas, especialistas em beleza, arquitetos, professores e profissionais liberais.",
        },
        {
          question: "Como funciona o controle de horários e da agenda?",
          answer:
            "Você define seus dias e janelas de atendimento no painel. Quando o cliente escolhe um horário na sua página pública, esse horário é bloqueado imediatamente, impedindo conflitos ou agendamentos em duplicidade.",
        },
        {
          question: "O que é o Intervalo de Respiro entre consultas?",
          answer:
            "É um tempo de descanso configurável (como 10, 15 ou 30 minutos) inserido automaticamente entre os atendimentos. Ele garante que um novo paciente ou cliente não agende colado no término do anterior, dando a você tempo para respirar, organizar anotações e evitar atrasos.",
        },
        {
          question: "Meus clientes precisam baixar algum aplicativo ou criar conta?",
          answer:
            "Não! Os clientes acessam seu link diretamente pelo navegador do celular ou computador, escolhem a data e horário disponíveis, informam nome e telefone, e confirmam em 1 clique sem burocracia.",
        },
        {
          question: "Posso cadastrar diferentes tipos de serviços e consultas?",
          answer:
            "Sim! Você pode cadastrar múltiplos serviços com durações personalizadas (ex: 15 min, 30 min, 45 min, 60 min, 90 min), categorias, descrições e orientações específicas para cada tipo de atendimento.",
        },
        {
          question: "Como começar a usar?",
          answer:
            "Basta criar sua conta com o Google, configurar seus horários de atendimento, e seu link exclusivo estará ativo e pronto para compartilhar em menos de 1 minuto.",
        },
      ],
    },
    mural: {
      badge: "Mural de Especialistas R3uno",
      title: "Descubra quem já organiza seu tempo com o R3uno.",
      subtitle:
        "Navegue pelo mural de páginas públicas de agendamento. Veja como profissionais renomados de diversas áreas oferecem uma experiência de reserva visual, prática e conectada à agenda.",
      allSpecialists: "✨ Todos os Especialistas",
      health: "🩺 Saúde & Médicos",
      psychology: "🧠 Psicologia & Terapia",
      law: "⚖️ Advocacia & Direito",
      consulting: "📊 Consultoria & Negócios",
      design: "📐 Arquitetura & Design",
      bookNow: "Agendar",
      nextSlot: "Próximo horário",
      reviews: "avaliações",
      format: "Formato:",
      duration: "Duração média:",
      investment: "Investimento:",
      firstSlot: "Primeira vaga:",
      modalCta: "Criar Minha Própria Página Assim",
      modalSub: "Crie sua conta profissional em 1 minuto com o Google.",
      bannerTitle: "Sua agenda pública personalizada e impecável.",
      bannerDesc:
        "Tenha uma página elegante com sua foto, especialidades, regras de atendimento e horários atualizados em tempo real no seu painel.",
      bannerCta: "Começar Minha Página Grátis",
    },
    demo: {
      browserUrl: "r3uno.app/sua-agenda",
      liveAvailability: "Disponibilidade em tempo real",
      businessTitle: "Profissional / Empresa",
      businessCategory: "Consultoria e Atendimentos",
      selectedService: "Serviço Selecionado:",
      serviceName: "Consultoria / Sessão Especializada",
      serviceDuration: "45 minutos",
      serviceMode: "Atendimento Individual",
      serviceDesc:
        "Escolha a melhor data e horário disponível. Ao confirmar, o horário é imediatamente reservado na agenda com proteção de intervalo de descanso.",
      step1Date: "1. Escolha uma Data",
      step2Slot: "2. Escolha um Horário",
      nameLabel: "Seu Nome *",
      namePlaceholder: "João Silva",
      phoneLabel: "Seu Telefone / Celular *",
      phonePlaceholder: "+55 (11) 99999-9999",
      submitButton: "Confirmar Agendamento em 1 Clique",
      confirmedTitle: "Agendamento Confirmado!",
      confirmedDesc:
        "Seu atendimento foi agendado com sucesso e adicionado à agenda.",
      clientLabel: "Cliente:",
      dateLabel: "Data e Horário:",
      atTime: "às",
      resetButton: "Simular Outro Agendamento",
    },
    cta: {
      badge: "Comece Agora Mesmo",
      title: "Pronto para descomplicar sua rotina de agendamentos?",
      subtitle:
        "Crie seu link exclusivo de agendamento, configure seus horários de atendimento e comece a receber reservas hoje mesmo.",
      button: "Criar Minha Conta Gratuita",
      badgeGoogle: "Conexão Segura com Google",
      badgeSetup: "Configuração em 1 Minuto",
      badgeActive: "Ativação Imediata",
    },
    footer: {
      brandDesc:
        "Plataforma simplificada de agendamento online e gestão de calendário para todos os segmentos.",
      howItWorks: "Como Funciona",
      features: "Recursos",
      calendar: "Agenda",
      faq: "FAQ",
      login: "Entrar",
      rights: "R3uno Technologies. Todos os direitos reservados.",
      privacyPolicy: "Política de Privacidade",
      termsOfService: "Termos de Serviço",
      oauthBadge: "Google Workspace OAuth 2.0",
    },
    cookieConsent: {
      title: "Privacidade & Cookies",
      badge: "Proteção de Dados",
      desc: "Utilizamos cookies e tecnologias seguras para autenticação, sincronização de agenda em tempo real e para melhorar sua experiência profissional, em conformidade com a nossa",
      privacyLink: "Política de Privacidade",
      termsLink: "Termos de Serviço",
      preferences: "Preferências",
      essentialOnly: "Apenas Essenciais",
      acceptAll: "Aceitar Todos",
      modalTitle: "Preferências de Cookies e Dados Pessoais",
      modalDesc:
        "Respeitamos sua privacidade e garantimos controle total sobre o processamento das suas informações. Selecione quais categorias de cookies você autoriza:",
      c1Title: "1. Cookies Essenciais & Autenticação",
      c1Badge: "Sempre Ativo",
      c1Desc:
        "Necessários para a operação básica da plataforma, sessões seguras, login e integridade dos agendamentos.",
      c2Title: "2. Cookies de Desempenho e Estatísticas",
      c2Desc:
        "Permitem métricas agregadas de velocidade da plataforma, estabilidade e uso para otimização contínua.",
      c3Title: "3. Cookies de Funcionalidade & Preferências",
      c3Desc:
        "Salvam suas preferências de visualização, estado de filtros e notificações de agendamento.",
      rejectOptional: "Rejeitar Opcionais",
      savePreferences: "Salvar Preferências",
    },
    auth: {
      loginTitle: "Autenticação Corporativa",
      loginSubtitle:
        "Acesso unificado com Google Workspace ou conta Gmail profissional.",
      loginWithGoogle: "Entrar com o Google",
      authenticating: "Validando credenciais corporativas...",
      googleIdentityBadge: "Autenticação unificada via Google Identity",
      governanceTitle: "Padrões de Segurança e Governança",
      ssoFeature:
        "Single Sign-On (SSO): Acesso sem senhas manuais protegido por MFA do Google.",
      lgpdFeature:
        "Conformidade e Privacidade (LGPD): Total conformidade com as diretrizes de proteção de dados.",
      tlsFeature:
        "Criptografia TLS 1.3: Transmissão de dados criptografada de ponta a ponta.",
      noAccountPrompt: "Ainda não possui uma conta ativa?",
      requestAccess: "Solicitar Acesso Corporativo",
      signupTitle: "Criar Conta Profissional",
      signupSubtitle:
        "Configure sua infraestrutura de agendamento automatizado com autenticação imediata com o Google.",
      pillar1Title: "Horários Flexíveis",
      pillar1Desc: "Controle total sobre dias de atendimento e horários.",
      pillar2Title: "Zero Conflitos",
      pillar2Desc: "Prevenção automática contra reservas duplicadas.",
      pillar3Title: "Intervalos de Pausa",
      pillar3Desc: "Intervalos automáticos de descanso entre sessões.",
      agreeTermsText: "Li e concordo com os",
      signupWithGoogle: "Começar com o Google",
      creatingAccount: "Criando conta com o Google...",
      noPasswordBadge: "Configuração imediata sem necessidade de senhas manuais",
      alreadyHaveAccount: "Já possui uma conta?",
      loginAction: "Entrar com o Google",
    },
    dashboard: {
      loadingTitle: "Carregando painel de agendamentos...",
      loadingSubtitle: "Sincronizando com sua conta Google",
      greetingMorning: "Bom dia",
      greetingAfternoon: "Boa tarde",
      greetingEvening: "Boa noite",
      connectedBadge: "Painel Conectado",
      specialistDefault: "Especialista",
      hasAppointmentsHeading: "Você tem",
      noAppointmentsHeading:
        "Sua agenda está livre para novas reservas hoje.",
      bannerDesc:
        "Todos os horários marcados pelos seus clientes são atualizados em tempo real no seu painel. Compartilhe seu link exclusivo para receber novos agendamentos sem esforço.",
      copyLinkSuccess: "Link público copiado!",
      copyLinkDesc:
        "Compartilhe este link com seus clientes para que eles agendem diretamente.",
      nextAppointmentTitle: "Próximo Atendimento da Agenda",
      confirmedSlot: "Horário Confirmado",
      freeScheduleTitle: "Agenda livre para as próximas horas",
      freeScheduleDesc:
        "Seus horários de disponibilidade estão ativos. Novos agendamentos feitos pelos seus clientes aparecerão aqui automaticamente.",
      viewDetails: "Ver Detalhes do Atendimento",
      manualBooking: "Agendar Atendimento Manual",
      proBadge: "PRO",
      tipBadge: "Dica de Otimização R3uno",
      tipTitle: "Personalize seus Intervalos de Pausa",
      tipDesc:
        "Ative pausas automáticas de 10 ou 15 minutos entre consultas para tomar um café, organizar prontuários e evitar atrasos em cascata.",
      tipAction: "Ajustar regras de pausa",
      tipAutomated: "100% Automatizado",
      statToday: "Atendimentos de Hoje",
      statTodayActive: "agendados hoje",
      statTotal: "Total Agendado",
      statSynced: "Histórico de reservas",
      statAttendance: "Taxa de Comparecimento",
      statCompleted: "concluídos",
      statHighRate: "Alta Taxa",
      statServices: "Tipos de Serviços",
      statManage: "Gerenciar",
      statEffectiveness: "efetividade",
      tabCalendar: "Calendário Interativo",
      tabTable: "Lista de Agendamentos",
      tabServices: "Catálogo de Serviços",
      syncData: "Sincronizar Dados",
      inspirationTitle: "Organize seus horários e serviços",
      inspirationDesc:
        "Defina seus dias de atendimento e cadastre seus serviços para que seus clientes possam agendar com facilidade.",
      inspirationAction: "Configurar Horários",
      publicPage: "Página Pública",
      copyLink: "Copiar Link",
      googleCalendar: "Conta Google",
      realTimeSync: "Tempo Real",
      proPanel: "Painel Profissional",
      mainMenu: "Menu Principal",
      navOverview: "Visão Geral",
      navServices: "Serviços",
      navAvailability: "Disponibilidade",
      navSettings: "Configurações & Privacidade",
      navNewAppointment: "Novo Agendamento",
      publicLinkTitle: "Link Público",
      signOut: "Sair da Conta",
      signedOutToast: "Você saiu da sua conta.",
      syncSuccessToast: "Dados do painel sincronizados!",
      syncErrorToast: "Erro ao atualizar dados do painel.",
    },
    calendarView: {
      today: "Hoje",
      prevMonth: "Mês anterior",
      nextMonth: "Próximo mês",
      appointmentsCount: "agendamento",
      emptyDayTitle: "Nenhum agendamento para este dia.",
      emptyDayDesc:
        "Sua agenda está livre nesta data. Você pode criar um agendamento manual ou aguardar reservas através do seu link público.",
      scheduleThisDay: "Agendar Horário Neste Dia",
      newBooking: "Agendar",
      viewDetails: "Ver detalhes",
    },
    tableView: {
      searchPlaceholder: "Buscar por cliente, telefone, e-mail ou serviço...",
      allFilter: "Todos",
      confirmedFilter: "Confirmados",
      completedFilter: "Concluídos",
      cancelledFilter: "Cancelados",
      exportCsv: "Exportar CSV",
      colClient: "Cliente / Contato",
      colService: "Serviço / Atendimento",
      colDuration: "Duração",
      colDateTime: "Data & Horário",
      colStatus: "Status",
      colActions: "Ações",
      emptyTitle: "Nenhum agendamento encontrado.",
      emptyDesc:
        "Tente ajustar os termos da busca ou filtre por outro status de atendimento.",
      viewDetails: "Ver Detalhes",
      exportSuccess: "Relatório CSV exportado com sucesso!",
      exportEmpty: "Nenhum registro para exportar.",
    },
    newAppointment: {
      breadcrumbNew: "Novo Agendamento",
      title: "Agendar Novo Atendimento",
      subtitle:
        "Insira os dados do cliente, selecione o serviço e reserve o horário diretamente na sua agenda.",
      serviceTypeLabel: "Tipo de Serviço / Atendimento *",
      noServicesRegistered: "Nenhum serviço cadastrado ainda.",
      registerServicesLink: "Cadastre serviços no catálogo",
      clientDataTitle: "Dados do Cliente:",
      clientNameLabel: "Nome Completo *",
      clientNamePlaceholder: "Ex: Carlos Silva",
      clientPhoneLabel: "Telefone / Celular *",
      clientPhonePlaceholder: "(11) 98765-4321",
      clientEmailLabel: "E-mail (Opcional)",
      clientEmailPlaceholder: "cliente@exemplo.com",
      dateTimeTitle: "Data & Horário:",
      selectedDateLabel: "Data Selecionada:",
      timeLabel: "Horário:",
      internalNotesLabel: "Observações Internas / Orientações:",
      internalNotesPlaceholder:
        "Ex: Primeira consulta, alinhamento de escopo, orientações prévias...",
      summaryTitle: "Resumo do Agendamento",
      newBadge: "Novo",
      googleSyncNoteTitle: "Proteção Automática de Horários",
      googleSyncNoteDesc:
        "O atendimento será registrado instantaneamente no seu painel, reservando o horário e prevenindo conflitos de agenda.",
      consentCheckbox:
        "Declaro que o cliente consentiu com o tratamento dos dados de contato para confirmação da agenda em conformidade com a",
      creating: "Criando Agendamento...",
      confirmAndSave: "Confirmar & Salvar na Agenda",
      cancelAndReturn: "← Cancelar e Voltar",
      successToast: "Agendamento criado com sucesso!",
      errorToast: "Erro ao criar agendamento",
    },
    appointmentDetail: {
      recordBadge: "Registro de Atendimento",
      clientFile: "Ficha do Cliente",
      callClient: "Ligar para o Cliente",
      editReschedule: "Editar / Reagendar",
      complete: "Concluir",
      notesTitle: "Observações do Atendimento / Histórico",
      emptyNotes: "Nenhuma observação interna registrada para este atendimento.",
      quickStatusTitle: "Alterar Status Rapidamente",
      actionsTitle: "Ações",
      anonymizeLgpd: "Anonimizar Cliente (LGPD)",
      deletePermanent: "Excluir Registro Permanentemente",
      confirmDelete:
        "Tem certeza que deseja excluir permanentemente este registro de agendamento?",
      confirmCancel: "Tem certeza que deseja cancelar este agendamento?",
      confirmAnonymize:
        "Tem certeza que deseja anonimizar os dados pessoais deste cliente? Nome, telefone e observações serão descaracterizados, preservando o histórico estatístico.",
      anonymizeSuccess: "Dados do cliente anonimizados com sucesso!",
      deleteSuccess: "Registro excluído com sucesso.",
      createdOn: "Criado em",
      notFound: "Agendamento não encontrado ou indisponível.",
      loading: "Carregando detalhes do agendamento...",
      callPhone: "Ligar para o cliente",
      sendEmail: "Enviar e-mail direto",
      editModalTitle: "Editar Agendamento / Reagendar",
    },
    availability: {
      title: "Disponibilidade & Horários de Atendimento",
      subtitle:
        "Configure os dias em que atende, horários de início e fim, duração média das sessões e intervalos de descanso automáticos para evitar sobrecargas.",
      googleConnected: "Conta Google Conectada",
      daysTitle: "Dias de Atendimento",
      daysDesc:
        "Selecione os dias disponíveis para agendamentos no seu link público.",
      daysActive: "dias ativos",
      dayActive: "dia ativo",
      activeStatus: "Ativo",
      closedStatus: "Fechado",
      hoursTitle: "Janela de Atendimento & Intervalos de Pausa",
      hoursDesc:
        "Defina o horário diário disponível para reservas e o tempo de pausa entre uma sessão e outra.",
      startHour: "Início do Expediente",
      endHour: "Fim do Expediente",
      sessionDuration: "Duração da Consulta",
      breakInterval: "Pausa Entre Sessões",
      noBreak: "Sem intervalo (contínuo)",
      breakMinutes: "minutos de descanso",
      rulesTitle: "Regras Inteligentes de Sincronização & Proteção",
      rule1Title: "Prevenção Automática de Conflitos",
      rule1Desc:
        "Assim que um horário é agendado, ele é bloqueado imediatamente para impedir sobreposições e agendamentos duplos.",
      rule2Title: "Intervalo Inteligente de Respiro",
      rule2Desc:
        "Pausas automáticas entre sessões garantem tempo para se preparar para o próximo cliente sem correrias.",
      saveButton: "Salvar Preferências de Horários",
      saveSuccess:
        "Horários de atendimento e intervalos salvos com sucesso!",
    },
    services: {
      title: "Catálogo de Serviços",
      subtitle:
        "Configure os tipos de atendimento, reuniões e consultas oferecidos, definindo durações e orientações aos clientes.",
      newService: "Novo Serviço",
      searchPlaceholder: "Buscar por serviço, categoria ou descrição...",
      totalItems: "Total de itens:",
      createTitle: "Cadastrar Novo Tipo de Atendimento / Serviço",
      nameLabel: "Nome do Serviço / Atendimento *",
      namePlaceholder:
        "Ex: Sessão Estratégica Individual / Consulta Inicial",
      categoryLabel: "Categoria",
      categoryPlaceholder: "Ex: Consultoria & Negócios",
      durationLabel: "Duração Estimada",
      instructionsLabel: "Instruções ao Cliente & Descrição",
      instructionsPlaceholder:
        "Ex: Compareça com 5 minutos de antecedência / O link do atendimento será enviado por e-mail...",
      saveService: "Salvar Serviço",
      editServiceTitle: "Editar Tipo de Serviço / Atendimento",
      emptyTitle: "Nenhum serviço encontrado.",
      emptyDesc:
        "Adicione novos serviços ou ajuste os filtros para visualizar os itens cadastrados.",
      createFirst: "Cadastrar Primeiro Serviço",
      availableBadge: "Ativo",
      pausedBadge: "Pausado",
      publicPageNotice: "Página pública",
      configureAction: "Configurar →",
      confirmDelete: "Tem certeza que deseja excluir este serviço?",
      createSuccess: "Novo serviço criado com sucesso!",
      updateSuccess: "Serviço atualizado com sucesso!",
      deleteSuccess: "Serviço excluído com sucesso.",
    },
    settings: {
      title: "Configurações da Conta",
      subtitle:
        "Gerencie seu perfil profissional, conexões de login único, notificações e conformidade de privacidade.",
      tabProfile: "Perfil Profissional",
      tabGoogle: "Google Workspace SSO",
      tabNotifications: "Notificações",
      tabSecurity: "Segurança & Sessões",
      tabLgpd: "Privacidade & LGPD",
      tabLanguage: "Idioma / Language",
      publicUrlTitle: "Seu Link Público de Agendamento",
      profileSectionTitle: "Perfil & Informações Profissionais",
      profileSectionDesc:
        "Estas informações são exibidas aos clientes na sua página pública de agendamento e nas confirmações de agendamento.",
      fullName: "Nome Completo *",
      corporateEmail: "E-mail Corporativo (Google SSO)",
      roleSpecialty: "Cargo / Especialidade",
      rolePlaceholder:
        "Ex: Consultor Estratégico, Advogado, Psicólogo, Especialista...",
      organization: "Organização / Empresa / Consultório",
      organizationPlaceholder:
        "Ex: Studio & Associados, Advocacia Corporativa, Clínica Médica...",
      languagePreferenceTitle: "Preferência de Idioma / Language Preference",
      languagePreferenceDesc:
        "Escolha o idioma da interface do sistema. As alterações têm efeito imediato.",
      googleConnectionTitle: "Conexão Google Workspace & Autenticação",
      googleConnectionDesc:
        "Seu login é gerenciado de forma segura e exclusiva através do protocolo Google OAuth 2.0.",
      idProvider: "Provedor de Identidade:",
      googleAccount: "Conta Google Vinculada:",
      verificationStatus: "Status de Verificação:",
      officiallyVerified: "Oficialmente Verificada",
      dataProtectionTitle: "Proteção de Dados & Conformidade",
      dataProtectionDesc:
        "Todas as sessões e acessos cumprem rigorosamente as normas de privacidade de dados, mantendo tokens criptografados em RSA-256 e isolamento seguro de dados.",
      notificationsTitle: "Notificações por E-mail",
      notificationsDesc:
        "Configure alertas operacionais e lembretes para sua agenda de atendimentos.",
      emailAlertsLabel: "Alertas de Novos Agendamentos",
      emailAlertsDesc:
        "Receba uma notificação imediata por e-mail sempre que um cliente agendar ou cancelar um horário.",
      sessionsTitle: "Sessões Ativas & Segurança da Conta",
      sessionsDesc:
        "Monitore o status da sua autenticação e sessões ativas no navegador.",
      currentSessionTitle: "Sessão Atual no Navegador",
      currentSessionDesc: "Autenticado via Google Single Sign-On",
      signOutAll: "Sair de Todas as Sessões Ativas",
      lgpdTitle: "Central de Direitos de Privacidade & LGPD",
      lgpdDesc:
        "Gerencie a portabilidade dos seus dados, preferências de consentimento, anonimização e contato com o Encarregado de Proteção de Dados (DPO).",
      portabilityTitle: "Portabilidade de Dados Pessoais",
      portabilityDesc:
        "Exporte seu dossiê completo de dados, catálogo de serviços e registros de agendamento em formato estruturado JSON.",
      exportButton: "Exportar Meus Dados (JSON)",
      consentTitle: "Consentimento & Termos de Serviço",
      consentDesc:
        "Consentimento eletrônico registrado mediante autenticação federada via Google OAuth 2.0.",
      dpoTitle: "Encarregado de Proteção de Dados (DPO)",
      dpoDesc:
        "Canal oficial para solicitações de titulares, esclarecimentos sobre tratamento de dados e requisições formais.",
      dpoEmail: "dpo@r3uno.app",
      deletionTitle: "Exclusão de Dados & Anonimização",
      deletionDesc:
        "Solicite o encerramento permanente da conta e a anonimização dos seus dados em conformidade com a LGPD (Lei nº 13.709/2018).",
      deleteAccountButton: "Excluir Conta & Dados",
      deletePrompt:
        'Digite "EXCLUIR" para excluir permanentemente sua conta e anonimizar todos os registros de agendamento:',
      saveChanges: "Salvar Configurações",
      saveSuccess: "Configurações salvas com sucesso!",
    },
  },
};
