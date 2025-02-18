import creditCard from "../assets/icons/category_icons/credit-card.svg";
import document from "../assets/icons/category_icons/document.svg";
import education from "../assets/icons/category_icons/education.svg";
import food from "../assets/icons/category_icons/food.svg";
import gift from "../assets/icons/category_icons/gift.svg";
import health from "../assets/icons/category_icons/health.svg";
import house from "../assets/icons/category_icons/house.svg";
import investment from "../assets/icons/category_icons/investment.svg";
import key from "../assets/icons/category_icons/key.svg";
import laptop from "../assets/icons/category_icons/laptop.svg";
import entertainment from "../assets/icons/category_icons/entertainment.svg";
import pet from "../assets/icons/category_icons/pet.svg";
import subscription from "../assets/icons/category_icons/subscription.svg";
import transport from "../assets/icons/category_icons/transport.svg";
import trophy from "../assets/icons/category_icons/trophy.svg";
import shoppingBag from "../assets/icons/category_icons/shopping-bag.svg";
import notAssigned from "../assets/icons/category_icons/not-assigned.svg";
import others from "../assets/icons/category_icons/others.svg";

type IconMapType = {
  [key: string]: string;
};

export const defaultIcon = notAssigned;

export const selectableIcons = {
  credit_card: creditCard,
  document: document,
  education: education,
  food: food,
  gift: gift,
  health: health,
  house: house,
  investment: investment,
  key: key,
  laptop: laptop,
  entertainment: entertainment,
  pet: pet,
  subscription: subscription,
  transport: transport,
  trophy: trophy,
  shopping_bag: shoppingBag,
  others: others,
} as IconMapType;

export const IconMap = {
  undefined: notAssigned,
  ...selectableIcons,
} as IconMapType;
