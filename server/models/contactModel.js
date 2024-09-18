import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const remarkSchema = new Schema({
  text: String,
  date: { type: Date, default: Date.now }
});


const paymentFranchiseSchema = new Schema({
  date: {
    type: Date,
    default: null,
  },
  amount: {
    type: Number,
    default: 0,
  },
});

const itemSchema = new Schema({
  sku: { type: String, required: true },
  quantity: { type: String, required: true },
}, { _id: false });

const idAndPassComSchema = new Schema({
  id: { type: String, default: '' },
  pass: { type: String, default: '' },
}, { _id: false });

const idAndPassWebsiteSchema = new Schema({
  id: { type: String, default: '' },
  pass: { type: String, default: '' },
}, { _id: false });

const idAndPassInSchema = new Schema({
  id: { type: String, default: '' },
  pass: { type: String, default: '' },
}, { _id: false });

const taskSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  status: {
    type: String,
    enum: ['Pending', 'Done', 'Error'],
    default: 'Pending',
  },
  comment: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
}, { _id: false });

const fileSchema = new Schema({
  path: String,
  originalName: String,
}, { _id: false });

const paymentSchema = new mongoose.Schema({
  stage1: {
    amount: { type: String },
    paymentMode: { type: String },
    date: { type: String },
    status: { type: String },
  },
  stage2: {
    amount: { type: String },
    paymentMode: { type: String },
    date: { type: String },
    status: { type: String },
  },
  stage3: {
    amount: { type: String },
    paymentMode: { type: String },
    date: { type: String },
    status: { type: String },
  },
});


const contactSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  enrollmentId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  primaryContact: {
    type: String,
    required: true,
  },
  secondaryContact: {
    type: String,
  },
  service: {
    type: String,
    required: true,
  },
  managerId: {
    type: Schema.Types.ObjectId,
    ref: 'Manager',
  },
  password: {
    type: String,
  },
  passwordSet: { type: Boolean, default: false },
  // IN
  idCard: {
    type: String,
  },
  idCardDate: {
    type: String,
  },
  gallery: {
    type: String,
  },
  galleryDate: {
    type: String,
  },
  archive: {
    type: String,
  },
  legality: {
    type: String,
  },
  legalityLink: {
    type: String,
  },
  legalityDate: {
    type: String,
  },
  template1Sent: { type: Boolean, default: false },
  template2Sent: { type: Boolean, default: false },
  template3Sent: { type: Boolean, default: false },
  template4Sent: { type: Boolean, default: false },
  template5Sent: { type: Boolean, default: false },
  template6Sent: { type: Boolean, default: false },
  template7Sent: { type: Boolean, default: false },
  template8Sent: { type: Boolean, default: false },
  template9Sent: { type: Boolean, default: false },
  template10Sent: { type: Boolean, default: false },
  template11Sent: { type: Boolean, default: false },
  template12Sent: { type: Boolean, default: false },
  template13Sent: { type: Boolean, default: false },
  template14Sent: { type: Boolean, default: false },
  template15Sent: { type: Boolean, default: false },
  template16Sent: { type: Boolean, default: false },
  template17Sent: { type: Boolean, default: false },
  template18Sent: { type: Boolean, default: false },
  template19Sent: { type: Boolean, default: false },
  template20Sent: { type: Boolean, default: false },
  template21Sent: { type: Boolean, default: false },
  template22Sent: { type: Boolean, default: false },
  // template23Sent: { type: Boolean, default: false },
  // template24Sent: { type: Boolean, default: false },
  // template25Sent: { type: Boolean, default: false },
  // template26Sent: { type: Boolean, default: false },
  // template27Sent: { type: Boolean, default: false },
  // template28Sent: { type: Boolean, default: false },
  // template29Sent: { type: Boolean, default: false },
  // template30Sent: { type: Boolean, default: false },
  // template31Sent: { type: Boolean, default: false },
  // template32Sent: { type: Boolean, default: false },
  // template33Sent: { type: Boolean, default: false },
  // template34Sent: { type: Boolean, default: false },
  // template35Sent: { type: Boolean, default: false },
  // template36Sent: { type: Boolean, default: false },
  // template37Sent: { type: Boolean, default: false },
  // template38Sent: { type: Boolean, default: false },
  // template39Sent: { type: Boolean, default: false },
  // template40Sent: { type: Boolean, default: false },
  // template41Sent: { type: Boolean, default: false },
  category: {
    type: String,
  },
  state: {
    type: String,
  },
  gst: {
    type: String,
  },
  gstDescription: {
    type: String,
  },
  onboardingStatus: {
    type: String,
  },
  onboardingDescription: {
    type: String,
  },
  brandName: {
    type: String,
  },
  accountOpenIn: {
    type: String,
  },
  idAndPassIn: {
    type: idAndPassInSchema,
  },
  gtin: {
    type: String,
  },
  gtinDescription: {
    type: String,
  },
  listingsIn: {
    type: String,
  },
  launchDateIn: {
    type: String,
  },
  addRegionIn: {
    type: String,
  },
  shipping: {
    type: String,
  },
  cvcIn: {
    type: String,
  },
  cvcCom: {
    type: String,
  },
  fbaIn: {
    type: String,
  },
  stateCom: {
    type: String,
  },
  documentStatus: {
    type: String,
  },
  storeName: {
    type: String,
  },
  accountOpenCom: {
    type: String,
  },
  idAndPassCom: {
    type: idAndPassComSchema,
  },
  videoKyc: {
    type: String,
  },
  videoKycDescription: {
    type: String,
  },
  deduct: {
    type: String,
  },
  deductDescription: {
    type: String,
  },
  listingsCom: {
    type: String,
  },
  launchDateCom: {
    type: String,
  },
  nia: {
    type: String,
  },
  addCredit: {
    type: String,
  },
  addCreditDescription: {
    type: String,
  },
  fbaCom: {
    type: String,
  },
  tasks: {
    type: [taskSchema],
    default: [],
  },
  ovc: {
    type: String,
  },
  ovcDate: {
    type: String,
  },
  documents: [fileSchema],
 
  stage1Completion: {
    type: String,
  },
  stage1CompletionDate: {
    type: String,
  },
  payment: paymentSchema,
  theme: {
    type: String,
  },
  themeDate: {
    type: String,
  },
  serverPurchase: {
    type: String,
  },
  serverPurchaseDate: {
    type: String,
  },
  serverId: {
    type: String,
  },
  serverPassword: {
    type: String,
  },
  domainClaim: {
    type: String,
  },
  domainClaimDate: {
    type: String,
  },
  domainMailVerification: {
    type: String,
  },
  domainMailVerificationDate: {
    type: String,
  },
  websiteUploaded: {
    type: String,
  },
  websiteUploadedDate: {
    type: String,
  },
  paymentGateway: {
    type: String,
  },
  paymentGatewayDate: {
    type: String,
  },
  readyToHandover: {
    type: String,
  },
  readyToHandoverDate: {
    type: String,
  },
  idAndPassWebsite: {
    type: idAndPassWebsiteSchema,
  },
  subDomain: {
    type: String,
  },
  catFile: {
    type: String,
  },
  catDate: {
    type: Date,
  },
  flagStatus: { type: Boolean, default: false },
  productFile: {
    type: String,
  },
  productDate: {
    type: String,
  },
  logo: {
    type: String,
  },
  logoDate: {
    type: String,
  },
  banner: {
    type: String,
  },
  bannerDate: {
    type: String,
  },
  stage2Completion: {
    type: String,
  },
  stage2CompletionDate: {
    type: String,
  },
  stage3Completion: {
    type: String,
  },
  stage3CompletionDate: {
    type: String,
  },
  callDone: {
    type: String,
  },
  postWithDate: {
    type: String,
  },
  socialMedia: {
    type: String,
  },
  socialMediaDate: {
    type: String,
  },
  socialMedia1: {
    type: String,
  },
  socialMediaDate1: {
    type: String,
  },

  socialMedia2: {
    type: String,
  },
  socialMediaDate2: {
    type: String,
  },

  // Instagram
  accountOpenInsta: {
    type: String,
  },
  instagramId: {
    type: String,
  },
  instagramPassword: {
    type: String,
  },
  metaConnectedInsta: {
    type: String,
  },

  // Facebook
  accountOpenFacebook: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  facebookPassword: {
    type: String,
  },
  metaConnectedFacebook: {
    type: String,
  },

  // Pinterest
  accountOpenPinterest: {
    type: String,
  },
  pinterestId: {
    type: String,
  },
  pinterestPassword: {
    type: String,
  },
  postPinterest: {
    type: String,
  },

  // Medium
  accountOpenMedium: {
    type: String,
  },
  mediumId: {
    type: String,
  },
  mediumPassword: {
    type: String,
  },
  postMedium: {
    type: String,
  },

  // Quora
  accountOpenQuora: {
    type: String,
  },
  quoraId: {
    type: String,
  },
  quoraPassword: {
    type: String,
  },
  postQuora: {
    type: String,
  },

  items: [itemSchema],

  // amazon.in 
  accountOpenAmazonIn: {
    type: String,
  },
  amazonInId: {
    type: String,
  },
  amazonPass: {
    type: String,
  },

  // amazon.com
  accountOpenAmazonCom: {
    type: String,
  },
  amazonComId: {
    type: String,
  },
  amazonComPass: {
    type: String,
  },

  // flipkart
  accountOpenFlipkart: {
    type: String,
  },
  flipkartId: {
    type: String,
  },
  flipkartPass: {
    type: String,
  },

   // meesho
   accountOpenMeesho: {
    type: String,
  },
  meeshoId: {
    type: String,
  },
  meeshoPass: {
    type: String,
  },

   // ebay
   accountOpenEbay: {
    type: String,
  },
  ebayId: {
    type: String,
  },
  ebayPass: {
    type: String,
  },


  remarks: [remarkSchema],

  totalInvoiceValue: {
    type: Number,
    default: 0,
  },
  payment1: {
    type: paymentFranchiseSchema,
    default: () => ({}),
  },
  payment2: {
    type: paymentFranchiseSchema,
    default: () => ({}),
  },
  payment3: {
    type: paymentFranchiseSchema,
    default: () => ({}),
  },
  payment4: {
    type: paymentFranchiseSchema,
    default: () => ({}),
  },
  brandNameFranchise: {
    type: String,
  },
  brandNameSocial: {
    type: String,
  },
});

// Hash the password before saving the contact
contactSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Contact = model('Contact', contactSchema);

export default Contact;
