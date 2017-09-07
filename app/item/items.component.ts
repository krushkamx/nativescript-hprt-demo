import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import * as application from 'application';
import { Hprt, HPRTPrinter } from "nativescript-hprt";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Array<HPRTPrinter>;
    private hprt: Hprt;

    connected: string;
    text: string;
    selected: boolean;
    btEnabled: boolean;

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService) {
        this.text = "Test print";
        this.hprt = new Hprt();
        this.connected = "== NO CONNECTION ==";
        this.selected = false;
        this.btEnabled = false;
    }

    ngOnInit(): void {
        
        // Enable bluetooth
        this.enableBluetooth();

    }

    enableBluetooth() {

        console.log("Enabling bluetooth...");

        this.hprt.EnableBluetooth().then((res) => {
            console.log("Enabled", res);
            this.btEnabled = true;
        }, (err) => {
            console.log("Error", err);
        })
    }

    searchPrinters() {
        this.hprt.searchPrinters().then(printers => {
            this.items = printers;
        });
    }

    connect(port) {

        this.hprt.connect(port).then((res) => {
            console.log("success", res);
            this.connected = "== PRINTER CONNECTED ==";
            this.selected = true;
        }, (err) => {
            console.log("error", err)
        })

    }

    disconnect() {

        this.hprt.disconnect().then((res) => {
            console.log("success", res);
            this.connected = "== NO CONNECTION ==";
            this.selected = false;
        }, (err) => {
            console.log("error", err)
        })

    }

    printTextSimple() {      
        this.hprt.printTextSimple(this.text);
    }

    printReceipt() {
        // Sum this numbers to get attribute combination
        // Example: 
        // Double height: 16
        // Double Width: 32
        // Underline: 4
        // Bold: 2
        // Mini: 1
        // White text: 8

        let cart = [
            "Nativescript             $111.00",
            "Angular                  $222.00",
            "Typescript               $333.00",
            "HPRT                      $99.00"
        ];

        this.hprt.newLine();
        this.hprt.printText("Krushka Design", 1, 48, 0);
        this.hprt.printText("YOUR DEVELOPMENT AGENCY", 1, 1, 0);
        this.hprt.printTextCenter("-----");
        this.hprt.newLine();
        this.hprt.printTextSimple("Av Amsterdam 240, 4th floor");
        this.hprt.printTextSimple("06100, Condesa/Hipodromo");
        this.hprt.printTextSimple("Mexico City, Mexico");
        this.hprt.printTextSimple("Tel: +52 55 7589 6653");
        this.hprt.printTextSimple("Email: info@krushka.mx");
        this.hprt.newLine();
        this.hprt.printTextSimple("Date: 2017-09-01             #21");
        this.hprt.newLine();
        for (let index = 0; index < cart.length; index++) {
            this.hprt.printTextSimple(cart[index]);    
            this.hprt.horizontalLine();        
        }
        this.hprt.newLine();
        this.hprt.printTextSimple("Before tax              $1234.00");
        this.hprt.printTextSimple("Tax 16%                  $197.44");
        this.hprt.horizontalLine(); 
        this.hprt.printTextBold("Total                   $1431.44");
        this.hprt.newLine();
        this.hprt.printTextMini("Disclaimer: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget ligula dapibus, scelerisque nisl eget, elementum mi.");
        this.hprt.newLine();
        this.hprt.printTextCenter("-----");
        this.hprt.printText("Thank you for your business", 1, 16, 0);
        this.hprt.newLine(2);
    }

    printDoubleText() {
        this.hprt.printTextDouble(this.text);
    }

    printDoubleTextWidth() {
        this.hprt.printTextDoubleWidth(this.text);
    }

    printDoubleTextHeight() {
        this.hprt.printTextDoubleHeight(this.text);
    }

    printTextUnderline(){
        this.hprt.printTextUnderline(this.text);
    }

    printTextBold(){
        this.hprt.printTextBold(this.text);
    }

    printTextMini(){
        this.hprt.printTextMini(this.text);
    }

    printTextWhite(){
        this.hprt.printTextWhite(this.text);
    }

    printTextLeft(){
        this.hprt.printTextLeft(this.text);
    }

    printTextCenter(){
        this.hprt.printTextCenter(this.text);
    }

    printTextRight(){
        this.hprt.printTextRight(this.text);
    }

}