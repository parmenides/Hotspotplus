"use strict";function load(a,b,c,d){return{deps:["$ocLazyLoad","$q",function(e,f){var g=f.defer(),h=!1;return a=angular.isArray(a)?a:a.split(/\s+/),h||(h=g.promise),angular.forEach(a,function(a){h=h.then(function(){if(b[a])return e.load(b[a]);var d;return angular.forEach(c,function(b){d=b.name==a?b.name:a}),e.load(d)})}),g.resolve(),d?h.then(function(){return d()}):h}]}}function hideLoading(){document.getElementById("loader").style.display="none";var a=document.getElementsByClassName("appTemplate");for(var b in a)a[b].style&&(a[b].style.display="inherit")}window.businessConfig=window.businessConfig||{};var app=angular.module("masterHotspotApp",["ngResource","ngRoute","ui.router","pascalprecht.translate","ngTouch","ngRaven","toaster","oc.lazyLoad","ui.bootstrap"]).config(["$stateProvider","$urlRouterProvider","$controllerProvider","$compileProvider","$filterProvider","$provide","$translateProvider","JQ_CONFIG","MODULE_CONFIG",function(a,b,c,d,e,f,g,h,i){a.state("home",{template:'<div style="width: 80%;margin: 0 auto;text-align: center;margin-top: 250px;">Loading</div>',url:"/home.html",controller:"appCtrl"}).state("theme",{"abstract":!0,templateUrl:businessConfig.themeConfig.template+"Layout.tpl.html",url:"/"+businessConfig.selectedThemeId,resolve:load(["hotspotplus.tpls."+businessConfig.themeConfig.template,"themeStyles/"+businessConfig.selectedThemeId+"/"+businessConfig.themeConfig[businessConfig.selectedThemeId].style+".css"],h,i)}).state("theme.signin",{templateUrl:businessConfig.themeConfig.template+"SignIn.tpl.html",controller:businessConfig.themeConfig.controller+"SignInCtrl",url:"/signin.html"}).state("theme.signup",{templateUrl:businessConfig.themeConfig.template+"SignUp.tpl.html",controller:businessConfig.themeConfig.controller+"SignUpCtrl",url:"/signup.html"}).state("theme.forgetpassword",{templateUrl:businessConfig.themeConfig.template+"ForgetPassword.tpl.html",controller:businessConfig.themeConfig.controller+"ForgetPasswordCtrl",url:"/forgetPassword.html"}).state("theme.verify",{templateUrl:businessConfig.themeConfig.template+"Verify.tpl.html",controller:businessConfig.themeConfig.controller+"VerifyCtrl",url:"/verify.html"}).state("theme.selectVerification",{templateUrl:businessConfig.themeConfig.template+"SelectVerification.tpl.html",controller:businessConfig.themeConfig.controller+"SelectVerificationCtrl",url:"/selectVerification.html"}).state("theme.internetplans",{templateUrl:businessConfig.themeConfig.template+"InternetPlan.tpl.html",controller:businessConfig.themeConfig.controller+"InternetPlanListCtrl",url:"/internetplans.html"}).state("theme.status",{templateUrl:businessConfig.themeConfig.template+"Status.tpl.html",controller:businessConfig.themeConfig.controller+"StatusCtrl",url:"/status.html",params:{online:null,ip:null,download:null,upload:null,uptime:null,sessionTime:null}}).state("theme.lang",{templateUrl:businessConfig.themeConfig.template+"Lang.tpl.html",controller:businessConfig.themeConfig.controller+"LangCtrl",url:"/lang.html"}).state("theme.welcome",{templateUrl:businessConfig.themeConfig.template+"Welcome.tpl.html",controller:businessConfig.themeConfig.controller+"WelcomeCtrl",url:"/welcome.html"}),b.otherwise("/home.html"),g.translations("fa",{"RADIUS server is not responding":"آی پی روتر شما شناسایی نشد و یا secret روتر شما صحیح نیست با پشتیبانی تماس بگیرید.",loyaltySignUpHeader:"با عضویت در باشگاه مشتریان ما از اتصال به اینترنت پر سرعت بهره‌مند شوید.",welcomePageLogin:"ورود به اینترنت",loyaltySignInHeader:"شما با موفقیت وارد باشگاه مشتریان ما شدید.",failedToReadProfile:"خطایی در خواندن اطلاعات رخ داده است.",passwordAndUsernameAreRequired:"نام کاربری و رمز عبور الزامی است.","password is a required argument":"پیام لوکال: نام کاربری و رمز عبور الزامی است.","invalid username or password":"پیام لوکال: نام کاربری صحیح نیست.",checkHotspotNetworkConnection:"روتر شبکه‌ی شما در دسترس نیست، از اتصال به شبکه‌ی هات‌اسپات اطمینان پیدا کنید.",verifyHeaderText:"کد تایید ۴ رقمی برای شما پیامک شد، کد را  پس از دریافت وارد کنید.",alreadyMember:"در حال حاضر شما عضو هستید و نمی توانید دوباره عضو شوید. اگر رمز عبور خود را فراموش کرده‌اید بر روی 'رمز را فراموش کرده‌ام' بزنید یا به متصدی شبکه مراجعه کنید.",noPublicPlan:"هیچ پلن اینترنتی وجود ندارد.",thisDeviceIsLockedByOtherUser:"این دستگاه به نام کاربری دیگری اختصاص داده شده است، اگر رمز عبور خود را فراموش کرده‌اید از بازیابی رمز عبور استفاده کنید.",timeout:"به دلیل شلوغی شبکه‌ی وای‌فای و یا دور بودن از آنتن‌های وایرلس، اتصال شما به شبکه‌ی وای‌فای دچار اختلال شده است و درخواست‌های شما ارسال نمی‌شود.",logout:"خروج",nasIdIsInvalid:"شناسه‌ی روتر شما صحیح نیست. شناسه را از پروفایل روتر کپی و به عنوان nas identity تنظیم کنید.",bizIdIsInvalid:"خطایی در خواندن تنظیمات تم شما رخ داده است.",bizNotFound:"شناسه این شبکه معتبر نیست.",verifyTitle:"تایید موبایل",enterVerificationCode:"کد تایید را وارد نمایید",youAreConnected:"شما با موفقیت به اینترنت متصل شدید.",loggedInSuccessfully:"شما با موفقیت وارد و به اینترنت متصل شدید.",invalidCode:"کد صحیح نیست",congrats:"تبریک",confirm:"تایید",warning:"هشدار",verificationCode:"کد تایید",verificationCodeError:"کد تایید نادرست است",verificationMethod:"روش تایید هویت",chooseVerificationMethod:"روش تایید هویت را انتخاب کنید",mobileVerification:"تایید هویت از طریق دریافت پیامک حاوی کد تایید",supervisorVerification:"تایید هویت از طریق مراجعه به مسئول شبکه",memberExistPleaseContactOperatorForManualVerification:"برای فعال سازی این حساب کاربری به مسئول شبکه مراجعه کنید.",pleaseContactOperatorForManualVerification:"این کاربر ثبت شده است اما فعال نیست، برای فعال سازی این حساب کاربری به مسئول شبکه مراجعه کنید.",freeInternetPlan:"بسته ی رایگان",freePlanActivationFailed:"خطایی در فعال سازی بسته ی اینترنت رایگان شما رخ داده است.",freePlanActivated:"بسته ی اینترنت رایگان شما فعال شد.",signUpSuccess:"عضویت شما با موفقیت انجام شد. ",loading:"چند لحظه صبر کنید",mobile:"موبایل",waitOneMinute:"شما باید حداقل {0} دقیقه برای دریافت پیامک کد تایید صبر کنید، سپس می توانید درخواست ارسال مجدد کد را صادر کنید",resendVerification:"ارسال مجدد کد",requiredField:"*",userNotFound:"کاربری با این مشخصات پیدا نشد",generalError:"خطایی در برنامه رخ داده است",serverConnectionError:"خطایی در ارسال اطلاعات شما رخ داده است، از اتصال به شبکه‌ی هات‌اسپات اطمینان پیدا کنید.",paymentError:"خطا در پرداخت",requiredMessage:"وارد کردن این فیلد الزامی است",requiredFieldTitle:"تکمیل کردن فیلد های ستاره دار الزامی است.",firstName:"نام",lastName:"نام خانوادگی",fullName:"نام کامل",username:"نام کاربری",password:"رمز عبور",pinCode:"رمز دوم",confirmPassword:"تکرار رمز عبور",age:"سن",email:"ایمیل",nationalCode:"کد ملی",roomNumber:"شماره اتاق",passportNumber:"شماره گذرنامه",birthdayYear:"سال تولد، مثال: ۱۳۵۹",birthdayMonth:"ماه تولد",birthdayDay:"روز تولد، مثال: ۱۲",birthdayUndefined:"تاریخ تولد را کامل وارد کنید.",nationalCodeUndefined:"کد ملی نامعتبر می باشد.",studentGrade:"مقطع تحصیلی",studentId:"شماره دانشجویی",preBachelor:"کاردانی",bachelor:"کارشناسی",master:"کارشناسی ارشد",doctorate:"دکترا",error:"خطا",login:"ورود",unknownError:"خطای ناشناخته، لطفا دقایقی دیگر دوباره تلاش کنید",okay:"خب",loginWithUsername:"ورود",loginToByInternetPlan:"برای خرید بسته ی اینترنت لازم است با نام کاربری و رمز عبور وارد شوید.",usernameAndPasswordSent:"نام کاربری و رمز عبور برای شما پیامک شد",forgotPasswordTitle:"بازیابی رمز عبور",forgotPasswordHeaderText:"نام کاربری و یا شماره موبایل خود را وارد کنید تا رمز برای شما پیامک شود.",invalidUsernameOrPassword:"نام کاربری یا رمز عبور صحیح نیست",usernameOrMobile:"شماره موبایل",invalidMobile:"شماره موبایل ثبت نشده",invalidPassword:"رمز عبور صحیح نیست",signUpTitle:"عضویت",signUpHeaderText:"با تکمیل فرم زیر به باشگاه مشتریان ما ملحق شوید.",signUpBtn:"عضو می‌شوم",registerBtn:"ثبت‌ نام",forgotPassword:"رمز را فراموش کرده‌ام",homeTitle:"شبکه های اجتماعی",homeHeaderText:"ما را در شبکه های اجتماعی دنبال کنید",signInPhoneNumberHeaderText:"شماره موبایل خود را وارد نمایید",signInTitle:"ورود",signInHeaderText:"با نام کاربری و رمز عبور وارد شوید",signInPasswordTitle:"ورود",signInPasswordHeaderText:"رمز خود را وارد نمایید",pinCodeRequired:"وارد کردن رمز دوم الزامی است.",500:"خطایی در سمت سرور رخ داده با مدیر شبکه تماس بگیرید",600:"خطایی در سمت سرور رخ داده با مدیر شبکه تماس بگیرید",604:"خطایی در سمت سرور رخ داده با مدیر شبکه تماس بگیرید",601:"شما هیچ بسته ی اینترنتی ندارید، ابتدا یک بسته انتخاب کنید",602:"زمان استفاده ی شما از اینترنت به اتمام رسیده است",603:"حجم مصرفی شما به اتمام رسیده است",605:"مدت بسته ی اینترنت شما به اتمام رسیده است",internetIsOver:"اینترنت شما به اتمام رسیده است.",606:"یک نفر دیگر با این نام کاربری در حال استفاده از اینترنت است، دقایقی دیگر تلاش کنید",608:"این نام کاربری مجاز به ورود از این دستگاه نمی‌باشد.",signInBtn:"ورود",signOutBtn:"خروج",internetPlans:"بسته ها",internetPlan:"بسته",daily:"روزه",day:"روز",monthly:"ماهه",month:"ماه",planBulk:"حجم",planSpeed:"سرعت",planPrice:"قیمت",planTime:"مدت",toman:"تومان",rial:"ریال",internetPlansTitle:"بسته های اینترنت",selectPlansHeaderText:"بسته اینترنت مورد نظر خود را انتخاب کنید",noInternetPlanFound:"بسته اینترنتی پیدا نشد. لطفا یک بسته اینترنت خریداری یا فعال کنید.",internetPlansPayment:"پرداخت از طریق درگاه بانک",internetPlansPaymentInfo:"اطلاعات بسته اینترنت شما",internetPlansAssigned:"خرید با موفقیت انجام شد",internetPlansActivate:"فعالسازی رایگان بسته اینترنت",errorLoadingPage:"خطایی در برنامه رخ داده است.",skip:"بیخیال",becomeMember:"عضویت در باشگاه مشتریان",facebook:"فیسبوک",telegram:"تلگرام",instagram:"اینستاگرام",male:"آقا",female:"خانم",birthday:"تاریخ تولد 1364/1/1",signUp:"عضو می شوم",signUpVerificationError:"تعداد درخواست‌های کد تایید شما از حد مجاز بیشتر شده است، به مدیر شبکه مراجعه کنید.",invalidPaymentVerify:"خطای تایید پرداخت",insufficientBusinessCredit:"اعتبار موجود برای ارسال پیامک کافی نیست",signInSignInCheckBoxText:"رمز خود را فراموش کرده ام",send:"ارسال",passwordsNotMatch:"رمزها یکسان نیستند",logo:"لوگو",copyright:"©۱۳۹۵-۱۳۹۶ هات اسپات پلاس",chooseLanguageFa:"فارسی",chooseLanguageEn:"English",back:"بازگشت",getPasswordFromReceptionist:"رمز خود را از مسئول شبکه دریافت کنید.",activateInternetPlan:"برای فعال سازی بسته اینترنت خود با مسئول شبکه تماس بگیرید.",activateUsername:"این نام کاربری هنوز فعال نشده است. برای فعال شدن این نام کاربری می توانید تایید هویت پیامکی انجام دهید و یا به مسئول اینترنت مراجعه کنید.",errorLogOutPage:"خطا در هنگام خروج از برنامه",minute:"دقیقه",unlimited:"نامحدود",connectionTime:"زمان اتصال",timeDuration:" مدت زمان",fromTime:"از ساعت",toTime:"تا ساعت",memberInfoTitle:"اطلاعات حساب",packageName:"نام بسته",timeRemain:"زمان باقیمانده",bulkRemain:"حجم باقیمانده",buyPackageBtn:"خرید بسته",changePackageBtn:"تغییر بسته",gender:"جنسیت",KB:"کیلو بایت",MB:"مگا بایت",GB:"گیگابایت",Kbps:"کیلو بیت در ثانیه",Mbps:"مگا بیت در ثانیه",Gbps:"گیگا بیت در ثانیه",badRequest:"اطلاعات ورودی لازم را وارد کنید",IncorrectMobileNumber:"شماره موبایل صحیح نیست",verificationResend:"کد تایید مجددا ارسال شد",defaultPlanActivatedMax:"شما فعلا مجاز به استفاده‌ی مجدد از این بسته نیستید.",defaultPlanActivatedError:"خطا در فعال سازی بسته اینترنت پیش فرض",invalidMobileNumber:"شماره موبایل نامعتبر",invalidNationalCode:"کد ملی نامعتبر",invalidEmailAddress:"آدرس ایمیل نامعتبر",invalidAge:"سن نامعتبر",invalidBirthday:"تاریخ تولد نامعتبر",month1:"فروردین",month2:"اردیبهشت",month3:"خرداد",month4:"تیر",month5:"مرداد",month6:"شهریور",month7:"مهر",month8:"آبان",month9:"آذر",month10:"دی",month11:"بهمن",month12:"اسفند",attention:"توجه",userAlreadyExist:"این نام کاربری قبلا استفاده شده است",google:"برو به گوگل",recoverySmsSent:"رمز عبور به موبایل شما پیامک شد",yourIp:"آی پی شما",download:"دانلود",upload:"آپلود",upTime:"مدت زمان اتصال",statusHeaderText:"وضعیت",loyaltyStatusHeaderText:"شما به اینترنت متصل شدید",loyaltyWelcomeHeader:"به باشگاه مشتریان ما خوش آمدید.",connectBtn:"اتصال به اینترنت",noVerificationNeeded:"عدم نیاز به تایید هویت"}),g.translations("en",{checkHotspotNetworkConnection:"Your router is not accessible, Please make sure you are connected to the Hotspot Wifi",loyaltySignUpHeader:"Please join our customer club to connect the internet",loyaltySignInHeader:"You are signed in successfully",passwordAndUsernameAreRequired:"Password and Username are Required",verifyHeaderText:"کد تایید ۴ رقمی برای شما پیامک شد، کد را  پس از دریافت وارد کنید","password is a required argument":"نام کاربری و رمز عبور الزامی است.",alreadyMember:"User exist, If you forgot your password please use 'password recovery' or contact network administrator",verifyTitle:"تایید موبایل",enterVerificationCode:"Enter verification code",youAreConnected:"شما با موفقیت به اینترنت متصل شدید.",loggedInSuccessfully:"شما با موفقیت وارد و به اینترنت متصل شدید.",invalidCode:"کد صحیح نیست",pleaseContactOperatorForManualVerification:"Sign up completed to activate your account, contact network administrator.",memberExistPleaseContactOperatorForManualVerification:"User exist exist but is disabled, please contact network administrator.",congrats:"تبریک",confirm:"Confirm",warning:"هشدار",verificationCode:"Verification Code",verificationMethod:"Verification Method",chooseVerificationMethod:"Choose Verification Method",mobileVerification:"SMS Verification",supervisorVerification:"Verification By Supervisor",freeInternetPlan:"Free Package",freePlanActivationFailed:"An Error Has Occurred in Activating Free Internet Package",freePlanActivated:"Free Plan Activated Successfully",signUpSuccess:"عضویت شما با موفقیت انجام شد.شما میتوانید با نام کاربری و رمز عبوری که برای شما پیامک شده لاگین کنید. ",loading:"Please Wait",mobile:"mobile",waitOneMinute:"شما باید حداقل {0} دقیقه برای دریافت پیامک کد تایید صبر کنید، سپس می توانید درخواست ارسال مجدد کد را صادر کنید",resendVerification:"Resend Verification Code",requiredField:"*",userNotFound:"User Not Found",generalError:"An Error Has Occurred, Please try again later",serverConnectionError:"Server Connection Error",paymentError:"Error in Payment",requiredMessage:"Please Fill Out This Field",requiredFieldTitle:"Fields Marked With * Are Required",firstName:"First Name",lastName:"Last Name",fullName:"Full Name",username:"Username",password:"Password",pinCode:"Pin code",confirmPassword:"Confirm Password",age:"Age",email:"Email",nationalCode:"NationalCode",birthdayYear:"Year of Birth, Example: 1980",birthdayMonth:"Month of Birth",birthdayDay:"Day of Birth, Example: 12",birthdayUndefined:"Fill Birthday Fields Completely",error:"Error",login:"Log In",unknownError:"Unknown Error, Please try again later",okay:"OK",loginWithUsername:"Log In",loginToByInternetPlan:"For Buying Internet Package You Must Login First",usernameAndPasswordSent:"نام کاربری و رمز عبور برای شما پیامک شد",recoverySmsSent:"Your Password sent to Your Phone",forgotPasswordTitle:"Forgot Password",forgotPasswordHeaderText:"نام کاربری و یا شماره موبایل خود را وارد کنید تا رمز برای شما پیامک شود.",invalidUsernameOrPassword:"Incorrect Username or Password",invalidMobile:"No Mobile Number Registered",invalidPassword:"Invalid Password",signUpTitle:"Sign Up",signUpHeaderText:"با تکمیل فرم زیر به باشگاه مشتریان ما ملحق شوید.",signUpBtn:"Sign Up",registerBtn:"Sign Up",forgotPassword:"Forgot password",homeTitle:"Social Networks",homeHeaderText:"Follow Us on Social Networks",signInPhoneNumberHeaderText:"Enter Password",signInTitle:"Sign In",signInHeaderText:"Sign In with Username and Password",signInPasswordTitle:"Sign In",signInPasswordHeaderText:"Enter Password",600:"Server Error, Contact Network Admin",604:"Server Error, Contact Network Admin",601:"You Don't Have Active Package, Buy One",602:"Your Internet usage Time has Been Completed",603:"Your Internet usage Bulk has Been Completed",605:"The Term of Your Internet Connection Has Expired",606:"Another Person With This username is Using The Internet, Try Again Later",608:"You are not allowed to login from this device.",signInBtn:"Sign In",signOutBtn:"Sign Out",internetPlans:"Internet Plans",internetPlan:"Internet Plan",daily:"Days",day:"Day",monthly:"Months",month:"Month",planBulk:"Bulk",planSpeed:"Speed",planPrice:"Price",planTime:"Time",toman:"Toman",rial:"Rial",internetPlansTitle:"Internet Packages",selectPlansHeaderText:"Choose Your Internet Package",internetPlansPayment:"Payment",internetPlansPaymentInfo:"Your Internet Package Info",internetPlansAssigned:"خرید با موفقیت انجام شد",errorLoadingPage:"An Error Has Occurred in App",skip:"بیخیال",becomeMember:"عضویت در باشگاه مشتریان",facebook:"فیسبوک",telegram:"تلگرام",instagram:"اینستاگرام",male:"Male",female:"Female",birthday:"تاریخ تولد 1364/1/1",signUp:"Sign Up",signUpVerificationError:"Error Sending Too Much Verification Code",invalidPaymentVerify:"خطای تایید پرداخت",insufficientBusinessCredit:"اعتبار موجود برای ارسال پیامک کافی نیست",signInSignInCheckBoxText:"رمز خود را فراموش کرده ام",send:"Send",passwordsNotMatch:"Password Not Match",copyright:"©2015-2017 Hotspotplus.ir",chooseLanguageFa:"Persian Passengers",chooseLanguageEn:"Foreign Passengers",back:"Back",getPasswordFromReceptionist:"Get Your Password From The Receptionist",activateInternetPlan:"For Activate Your Internet Package Call Receptionist",activateUsername:"For Activate Your User Name Call Receptionist",errorLogOutPage:"An Error Has Occurred in Logging Out of App",minute:"Minute",unlimited:"Unlimited",connectionTime:"Connection Time",fromTime:"from Hour",toTime:"to Hour",memberInfoTitle:"Account Information",packageName:"package Name",timeRemain:"Remaining Time",bulkRemain:"Remaining Bulk",buyPackageBtn:"Buy Package",roomNumber:"Room Number",passportNumber:"Passport Number",gender:"Gender",badRequest:"Please Check Your Data Entry",IncorrectMobileNumber:"Incorrect Mobile Number",verificationResend:"Verification Code Resend",defaultPlanActivatedMax:"Default InternetPlan Activated Too Many Times",defaultPlanActivatedError:"Error in Activating Default InternetPlan",invalidMobileNumber:"Invalid Mobile Number",invalidNationalCode:"Invalid National Code",invalidEmailAddress:"Invalid Email Address",invalidAge:"Invalid Age",invalidBirthday:"Invalid Birthday",attention:"Attention",userAlreadyExist:"Username Already Exist",google:"Google",yourIp:"Your Ip",download:"Download",upload:"Upload",upTime:"Up Time",statusHeaderText:"Status",loyaltyStatusHeaderText:"You are connected to internet.",loyaltyWelcomeHeader:"Welcome to the customer club",connectBtn:"Connect to the internet",noVerificationNeeded:"No verification needed."}),g.preferredLanguage("fa"),app.controller=c.register,app.directive=d.directive,app.filter=e.register,app.factory=f.factory,app.service=f.service,app.constant=f.constant,app.value=f.value}]).value("config",{}).run(["config","$log","$location","JQ_CONFIG","MODULE_CONFIG",function(a,b,c){angular.merge(a,window.businessConfig,{config:null,INTERNET_PLANS_FIND_URL:"/InternetPlans?filter[where][businessId]={0}&filter[order]=price {1}",SITE:"https://hotspotplus.ir",LANGUAGE_FA:"fa",LANGUAGE_EN:"en",DIRECTION_RTL:"rtl",DIRECTION_LTR:"ltr",LOADING:"loading",SIGN_IN:"signIn",FORGET_PASS:"forgetPassword",SIGN_UP:"signUp",CHOOSE_LANGUAGE:"chooseLang",VERIFY_MOBILE:"verifyMobile",STATUS:"status",INTERNET_PLANS:"internetPlans",INTERNET_PLAN_INFO:"internetPlanInfo",MESSAGE:"message",ERROR:"error",LOGIN_ERROR:"invalidUsernameOrPassword"}),a.resendTimeout=3;var d={};d.username="hotSpot"}]).controller("appCtrl",["$scope","$state","config","$log","appService","routerService","$location","appMessenger","translateFilter","errorMessage","$rootScope",function(a,b,c,d,e,f,g){function h(){return c.selectedThemeConfig.isMultiLanguage?"theme.lang":(c.localLang=c.LANGUAGE_FA,c.direction=c.DIRECTION_RTL,g.logoFooter=c.logoFooter,"theme.signin")}a.DownloadUrlPrefix=window.API_URL,c.themeConfig=businessConfig.themeConfig||{},businessConfig&&businessConfig.clearTextPassword&&businessConfig.username&&(c.username=businessConfig.username,c.password=businessConfig.clearTextPassword),c.selectedThemeConfig=businessConfig.themeConfig[businessConfig.selectedThemeId],c.selectedThemeConfig&&(c.selectedThemeConfig.logo&&c.selectedThemeConfig.logo.id?(c.logo=c.selectedThemeConfig.logo,c.logo.src=a.DownloadUrlPrefix+"/file/download/"+c.logo.id):(c.logo={},c.logo.name="logo",c.logo.src="img/"+c.selectedThemeId+"/logo/logo.png"),c.selectedThemeConfig.background&&c.selectedThemeConfig.background.id?(c.background=c.selectedThemeConfig.background,c.background.src=a.DownloadUrlPrefix+"/file/download/"+c.background.id):(c.background={},c.background.src="img/"+c.selectedThemeId+"/background/"+c.selectedThemeConfig.style+".jpg"),c.selectedThemeConfig.logoFooter&&(c.logoFooter=c.selectedThemeConfig.logoFooter),c.selectedThemeConfig.logoFooterEn&&(c.logoFooterEn=c.selectedThemeConfig.logoFooterEn),document.body.style.backgroundImage="url("+c.background.src+")"),f.isLogin(function(a,c){a&&d.error(a),c&&c.online===!0?b.go("theme.status",c):b.go(h())})}]);angular.module("masterHotspotApp").service("appService",["$http","config","$log","$q","usernameService",function(a,b,c,d,e){this.recoverHotspotUser=function(c,d){c.businessId=b.businessId,a.post(window.API_URL+"/Members/recoverHotspotUser",c).then(function(a){return d(null,a.data)})["catch"](function(a){return sendError("recoverHotspotUser",a,{usernameOrMobile:c}),d(a)})},this.loadRouterInfo=function(b,c){a.post(window.API_URL+"/Nas/loadRouterInfo",b).then(function(a){return c(null,a.data)})["catch"](function(a){return sendError("loadRouterInfo",a,{nasInfo:b}),c(a)})},this.loadConfig=function(b,c){a.post(window.API_URL+"/Businesses/loadConfig",b).then(function(a){return c(null,a.data)})["catch"](function(a){var d="bizIdIsInvalid";return 404==a.status&&(d="bizNotFound",sendError("loadConfig","business profile not found",{bizInfo:b})),sendError("loadConfig",a,{bizInfo:b}),c(d)})},this.getMemberBalance=function(b,c){a.post(window.API_URL+"/Members/getMemberBalance",b).then(function(a){return c(null,a.data)})["catch"](function(a){return sendError("getMemberBalance",a,{memberInfo:b}),c(a)})},this.signIn=function(b,c){b.username=e.concat(b.username,b.businessId),a.post(window.API_URL+"/Members/signIn",b).then(function(a){return c(null,a.data)})["catch"](function(a){return sendError("signIn",a,{userInfo:b}),c(a)})},this.signUpCustomer=function(b,c){a.post(window.API_URL+"/Members/signUpCustomer",b).then(function(a){return c(null,a.data)})["catch"](function(a){return sendError("signUpCustomer",a,{userInfo:b}),c(a)})},this.createHotSpotMember=function(b,c){a.post(window.API_URL+"/Members/createHotSpotMember",b).then(function(a){return c(null,a.data)})["catch"](function(a){return sendError("createHotSpotMember",a,{user:b}),c(a)})},this.findInternetPlan=function(b,c){a.post(window.API_URL+"/InternetPlans/getPublicInternetPlans",b).then(function(a){return c(null,a.data)})["catch"](function(a){return sendError("findInternetPlan",a,{businessId:b}),c(a)})},this.verifyHotSpot=function(b,c){a.post(window.API_URL+"/Members/verifyHotSpot",b).then(function(a){return c(null,a.data)})["catch"](function(a){return sendError("verifyHotSpot",a,{user:b}),c(a)})},this.assignFreePlanToMember=function(b){var c=d.defer();return a.post(window.API_URL+"/InternetPlans/assignFreePlanToMember",b).then(function(a){return c.resolve(a.data)})["catch"](function(a){return sendError("assignFreePlanToMember",a,{freePlan:b}),c.reject(a)}),c.promise},this.payment=function(e){var f=d.defer();return e.businessId=b.businessId,e.memberId=b.memberId,e.nasId=b.nasId,e.host=b.host,e.password=b.password,e.username=b.username,a.post(window.API_URL+"/Members/paySubscription",e).then(function(a){return a.data&&!a.data.url?f.reject(a.data):f.resolve(a.data)})["catch"](function(a){return c.error(a),sendError("payment",a,{paymentData:e}),f.reject(a)}),f.promise},this.checkDefaultInternetPlan=function(b,c){a.post(window.API_URL+"/Members/checkDefaultPlan",b).then(function(a){return c(null,a.data)})["catch"](function(a){return sendError("checkDefaultInternetPlan",a,{defaultPlan:b}),c(a)})},this.createForeignHotSpotMember=function(b,c){a.post(window.API_URL+"/Members/createForeignHotSpotMember",b).then(function(a){return c(null,a.data)})["catch"](function(a){return sendError(a,{method:"createForeignHotSpotMember"},{user:b}),c(a)})}}]).service("errorMessage",["$log","appMessenger",function(a,b){this.show=function(c){a.error(c);var d="generalError";c&&-1===c.status&&(d="timeout"),c&&c.data&&c.data.error&&c.data.error.message&&(d=c.data.error.message),b.showError(d)}}]),angular.module("masterHotspotApp").constant("JQ_CONFIG",{}).constant("MODULE_CONFIG",[{name:"hotspotplus.tpls.alpha",files:["controllers/alpha.templates.js","controllers/base.js"]},{name:"hotspotplus.tpls.loyalty",files:["controllers/loyalty.templates.js","controllers/loyalty.js"]}]).config(["$ocLazyLoadProvider","MODULE_CONFIG",function(a,b){a.config({debug:!1,events:!0,modules:b})}]),angular.module("masterHotspotApp").filter("requiredField",["$log","translateFilter",function(a,b){return function(a,c){return c?b("requiredField")+" "+a:a}}]),app.filter("englishNumber",function(){return function(a){if(a=String(a),!a)return"";var b=a.toString();return b=b.replace(/۱/g,"1").replace(/۲/g,"2").replace(/۳/g,"3").replace(/۴/g,"4").replace(/۵/g,"5").replace(/۶/g,"6").replace(/۷/g,"7").replace(/۸/g,"8").replace(/۹/g,"9").replace(/۰/g,"0").replace(/١/g,"1").replace(/٢/g,"2").replace(/٣/g,"3").replace(/٤/g,"4").replace(/٥/g,"5").replace(/٦/g,"6").replace(/٧/g,"7").replace(/٨/g,"8").replace(/٩/g,"9").replace(/٠/g,"0")}}),app.filter("persianNumber",function(){return function(a){if(a=String(a),!a)return"";var b=a.toString();return b=b.replace(/1/g,"۱").replace(/2/g,"۲").replace(/3/g,"۳").replace(/4/g,"۴").replace(/5/g,"۵").replace(/6/g,"۶").replace(/7/g,"۷").replace(/8/g,"۸").replace(/9/g,"۹").replace(/0/g,"۰").replace(/1/g,"۱").replace(/2/g,"۲").replace(/3/g,"۳").replace(/4/g,"۴").replace(/5/g,"۵").replace(/6/g,"۶").replace(/7/g,"۷").replace(/8/g,"۸").replace(/9/g,"۹").replace(/0/g,"۰")}}),angular.module("masterHotspotApp").service("routerService",["$http","config","$log","$q","$httpParamSerializer",function(a,b,c,d,e){function f(c){var d="http://"+b.host+"/status",f={};f.headers={"Content-Type":"application/x-www-form-urlencoded"},a.post(d,e({ok:!0}),f).then(function(a){var b=a.data;if("true"===b.online){var d={online:!0,ip:b.ip,sessionTime:b.sessionTime,uptime:b.uptime,upload:b.upload,download:b.download};return b.redir&&b.redir.logoutURL&&(d.logoutUrl=b.redir.logoutURL),c(null,d)}return c(null,{online:!1})})["catch"](function(a){return c(a)})}function g(a){var d=Pepper({host:b.uamip,port:b.uamport});d.refresh(function(d,e){if(c.debug("########### isCoovaChilliLogin ##########"),c.debug(e),c.debug(d),e.challenge&&(b.challenge=e.challenge),d)return a(d);if(e.accounting){var f=e.accounting,g=e.redir||{};return a(null,{online:!0,ip:g.ipAddress,sessionTime:-1,logoutUrl:g.logoutURL,clientMac:g.macAddress,uptime:f.sessionTime,upload:f.outputOctets,download:f.inputOctets})}return a(null,{online:!1})})}function h(d,f,g){c.info("login to mikrotik");var h="http://"+b.host+"/login",i={};i.headers={"Content-Type":"application/x-www-form-urlencoded"},a.post(h,e({username:d,password:f}),i).then(function(b){var c=b.data;return c&&"false"==c.ok?(sendError("Router login",{"error message":c.message},{username:d,password:f}),g({message:c.message})):(a.get("https://www.google.com/"),a.get("https://www.apple.com/"),g(null))})["catch"](function(a){return g(a)})}function i(c){var d="http://"+b.host+"/logout",f={};f.headers={"Content-Type":"application/x-www-form-urlencoded"},a.post(d,e({ok:!0}),f).then(function(a){var b=a.data;return b&&"false"==b.ok?(sendError("Router logout",{"error message":b.message}),c({message:a.message})):c(null,!0)})["catch"](function(a){return c(a)})}function j(a){var c=Pepper({host:b.uamip,port:b.uamport});c.logoff(function(b,c){return b?a(b):a()})}function k(d,e,f){c.info("login to coova",b.challenge);var g=Pepper({host:b.uamip,port:b.uamport});g.logon(d,e,{protocol:"CHAP"},function(b,d){return b?f(b):(c.debug(d),a.get("https://www.google.com/"),a.get("https://www.apple.com/"),f())})}function l(a){a.commit()}function m(){return b.accessPointType.toLowerCase()==p}function n(){return b.accessPointType.toLowerCase()==q}function o(){return b.accessPointType.toLowerCase()==r}var p="mikrotik",q="coovachilli",r="engenius";this.login=function(a,b,c,d){return m()?h(a,b,d):n()?k(a,b,d):o()?l(c,d):void 0},this.logout=function(a){return m()?i(a):n()?j(a):o()?j(a):void 0},this.isLogin=function(a){return m()?f(a):n()?g(a):o()?g(a):void 0}}]),angular.module("masterHotspotApp").service("appMessenger",["toaster","translateFilter",function(a,b){this.showSuccess=function(c,d){d&&(d="common.success"),a.pop("success",b(d),b(c))},this.showError=function(c,d){d&&(d="common.error"),a.pop("error",b(d),b(c))},this.showWarning=function(c,d){d&&(d="common.warning"),a.pop("warning",b(d),b(c))},this.showInfo=function(c,d){d&&(d="common.info"),a.pop("info",b(d),b(c))},this.showWait=function(c,d){d&&(d="common.wait"),a.pop("wait",b(d),b(c))}}]).service("loadingModal",["$log","$uibModal",function(a,b){var c=this;this.show=function(){b.open({backdrop:"static",animation:!0,keyboard:!1,backdropClick:!0,size:"sm",templateUrl:"loading.html",controller:["$scope","$uibModalInstance",function(a,b){c.modalInstance=b}]})},this.hide=function(){c.modalInstance&&c.modalInstance.close()}}]).service("numberService",["$log",function(a){this.clockToString=function(a){return 10>a?"0"+a:a}}]).service("usernameService",["$log",function(a){this.trim=function(a){return a.split("@")[0]},this.concat=function(a,b){return-1!==a.indexOf("@")?a:a.concat("@",b)}}]).service("nationalCode",["$log","englishNumberFilter",function(a,b){this.isValid=function(a){var c=a.length;if(c>7&&11>c){for(var d=Number(b(a)),e=[],f=0,g=0,h=0;10>h;h++)e[h]=d%10,d=parseInt(d/10),0==h?f=e[0]:g=e[h]*(h+1)+g;return g=parseInt(g%11),2>g&&g==f||11-g==f?!0:!1}return!1}}]).service("birthday",["$log","englishNumberFilter",function(a,b){this.getPersianEpochDay=function(a){if(a[0]&&a[1]&&a[2]){var c=Number(b(a[2])),d=a[1],e=Number(b(a[0])),f=persianDate([c,d,e]);return new Date(f.gDate).getTime()}return null},this.getEnglishEpochDay=function(a){if(a[0]&&a[1]&&a[2]){var c=Number(b(a[2])),d=a[1],e=Number(b(a[0])),f=new Date(c,d,e);return f.getTime()}return null}}]).directive("ngFormCommit",[function(){return{require:"form",link:function(a,b,c,d){d.commit=function(){b[0].submit()}}}}]);