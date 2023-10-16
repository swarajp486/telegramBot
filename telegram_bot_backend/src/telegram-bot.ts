
import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';
import { config } from 'dotenv';
config();
import { AdminService } from './admin/admin.service';
import { UserService } from './user/user.service';
// Replace with your Telegram bot token in .env file
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;



@Injectable()
export class TelegramBotService {
  private bot: TelegramBot;
  private subscribedUsers: Set<number> = new Set<number>();

  constructor(private readonly adminService: AdminService, private readonly userService: UserService,) {
    
    this.bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

    this.loadSubscribedUsers();
    

    this.registerCommands();

   

    this.bot.on('message',(msg)=>{this.sendWeatherUpdate(msg.chat.id,msg.text)})
  }

  private registerCommands() {
    console.log("hello");

    this.bot.onText(/\/start/, async(msg)=>{
      console.log("Hello");
      const chatId = msg.chat.id;
      const first_name = msg.from.first_name

      this.bot.sendMessage(chatId, `Hi ${first_name}, welcome to the weather bot, you can subscribe by using the /subscribe command, and unsubscribe using /unsubscribe command}`)
      

    })
    this.bot.onText(/\/subscribe/, async (msg) => {
      console.log(msg);
      
      const chatId = msg.chat.id;
      const userId = msg.from.id;
      const username = msg.from.first_name;
  
      const existingUser = await this.userService.getUserByChatId(chatId);
      console.log(existingUser);
      
  
      if (existingUser) {
        this.bot.sendMessage(chatId, 'You are already registered.Enter the City Name to get Weather');
      } else {
        const user = await this.userService.createUser(userId, username);
        if (user) {
          this.bot.sendMessage(chatId, 'You have been registered. Enter the City Name to get Weather');
          this.subscribedUsers.add(chatId);
          this.sendWeatherUpdate(chatId);
        } else {
          this.bot.sendMessage(chatId, 'Registration failed. Please try again.');
        }
      }
    });
  
    this.bot.onText(/\/unsubscribe/, async (msg) => {
      const chatId = msg.chat.id;
  
      const existingUser = await this.userService.getUserByChatId(chatId);
      if (existingUser) {
        const deletedUser = await this.userService.deleteUser(chatId);
        if (deletedUser) {
          this.subscribedUsers.delete(chatId);
          this.bot.sendMessage(chatId, 'You have been unregistered.');
        } else {
          this.bot.sendMessage(chatId, 'Unregistration failed. Please try again.');
        }
      } else {
        this.bot.sendMessage(chatId, 'You are not registered.');
      }
    });
  

    

   
    
  }


  private async sendWeatherUpdate(chatId: number,CITY:string="mumbai") {

    const apiKey = this.adminService.getApiKey();
    

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${apiKey}`,
      );

      if (!response.ok) {
        this.bot.sendMessage(chatId, "City doesn't exist.");
        return;
      }

      const data= await response.json();
      
      const weather = data.weather[0].description;
      const temperature = data.main.temp - 273.15;
      const city = data.name;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const message = `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%,and the wind speed is ${windSpeed}m/s.`;
      this.bot.sendMessage(chatId, message);
    } catch (error) {
      Logger.error('Error fetching weather data', error);
    }
  }

  private async loadSubscribedUsers() {
    const users = await this.userService.getUsers();
    users.forEach((user) => {
      this.subscribedUsers.add(user.chatId);
    });
  }
  
}
