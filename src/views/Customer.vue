<template>

  <div>
     <div>
        <v-div >
            <v-chip  flat class="ma-2 mp-2" close color="cyan" label text-color="white">
              <v-icon left>
                mdi-tag-outline
              </v-icon>
              Truck-Scale Customer List
            </v-chip>
        </v-div>
     </div> 
     <v-container >
        <div >
          <v-row>
            <v-col cols="12" md="12" lg="1" xl="1">
                <v-text-field v-model="paraCustomerCode" label="Code"></v-text-field>
            </v-col>              
            <v-col cols="12" md="12" lg="1" xl="1">
                <v-text-field v-model="paraCustomerName" label="Customer"
                @input="paraCustomerName = $event.target.value"
                ></v-text-field>
            </v-col>              
            <v-col cols="12" md="12" lg="1" xl="1">
                <v-text-field v-model="paraCustomerOwner" label="Owner"></v-text-field>
            </v-col>              
            <v-col cols="12" sm="12" md="12" lg="1" xl="1">
            <v-select
                v-bind:items="CustSupplyFlag"
                v-model="paraCustomerSupply"
                item-text="custsupply"
                item-value="custsupply"
                label="Invoice Y/N "
                single-line
            />
            </v-col>

                     
            <v-col cols="12" sm="12" md="1" lg="1" xl="1" >
                <v-btn
                color="primary"
                dark
                align-content-start
                flex-wrap
                class="pa-1 ma-1"
                v-bind="attrs"
                v-on="on"
                @click="fetchCustomerData()"
                >
                Search
                </v-btn>
          </v-col>
          </v-row>
        </div>
  
  </v-container>
  <v-container>
  <v-data-table
    :headers="headers"
    :items="dsTSCustomerList"
    v-model="selectedRows"
    item-key="code"
    fixed-header
    class="elevation-1"
  >
    <template v-slot:item.custcd="{item}">
      <v-chip  
        color="orange"
        label
        dark 
        outlined>
        {{ item.custcd }}
      </v-chip>
    </template>
    <template v-slot:item.custsupply="{item}">
      <div style="width:60px;">
        <v-select
          v-bind:items="CustSupplyFlag" 
          item-text="custsupply"
          v-model="item.custsupply"
          single-line          
        />
      </div>
    </template>

     <template v-slot:item.custower="props">

        <v-edit-dialog
          :return-value.sync="props.item.custower"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <h3 style="color:green;">{{ props.item.custower }}</h3>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.custower"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.custtel="props">
        <v-edit-dialog
          :return-value.sync="props.item.custtel"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.custtel }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.custtel"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.custadd="props">
        <v-edit-dialog
          :return-value.sync="props.item.custadd"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.custadd }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.custadd"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
  
    <template v-slot:footer>
      <div>
        <v-divider></v-divider>
        <v-row dense>
          <v-col class ="ml-1" cols="1" sm="1" md="1" lg="1" xl="1">
            <v-chip class="ma-2"
              color="green"
              text-color="white">
              TOTAL
            </v-chip>
          </v-col>
          <v-col class ="ml-1" cols="1" sm="1" md="1" lg="1" xl="1">
            <v-badge
            color="green"
            :content="dsTSCustomerList.length"
            :value="dsTSCustomerList.length"
            class="ma-2 mt-4"
            >
              ( Rows )
            </v-badge>
          </v-col>
 
        </v-row>
      </div>
    </template>
  </v-data-table>
</v-container>

        <v-dialog v-model="dialog3065" max-width="1024px">
            <v-card>
            <v-card-title>
                Scrap Out Detail List
            </v-card-title>

            <v-card-text>
                <v-container>
                      <v-data-table
                        :headers="dialogHeaders"
                        :items="dsTSCustomerList"
                        sort-by="rowseq"
                        :sort-desc="true"
                        v-model="selectedRows"
                        item-key="rowseq"
                        class="elevation-1"
                    >
                        <template v-slot:item.plastic1="{ item }">
                        <v-chip :color="getColor(item.plastic1)" dark>
                            {{ item.plastic1 }}
                        </v-chip>
                        </template>
                    </v-data-table>

               </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click.stop="dialog3065=false">
                Close
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
</div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import moment from "moment";

export default {
  data: () => ({
    singleSelect: false,
    selectedRows: [],
    dialog: false,
    dialogDelete: false,
    dialog3065: false,

    headers: [
      { text: "CODE", align: "start", value: "custcd" },
      { text: "CUSTOMER", align: "start", value: "custnm" },
      { text: "INVOICE", value: "custsupply" },
      { text: "OWNER", value: "custower" },
      { text: "TEL", value: "custtel" },
      { text: "AADRESS", align: "start", value: "custadd" },      
    ],


     dialogHeaders: [
      { text: "InDate", align: "start", value: "intime" },
      { text: "SER", value: "rowseq" },
      { text: "LOCATION", value: "odsl" },
      { text: "SCARP ZONE", value: "zone" },
      { text: "SCRAP ITEM", value: "scrapitem" },
      { text: "WT(Kg)", align: "end", value: "plastic1" },
      { text: "Id", align: "start", value: "chgname" },
      { text: "OutDate", align: "start", value: "outdattime" },
    ],


    dsTSCustomerList: [],
    selectData: "",

    tstotwtsum: 0.0,
    tsemptywtsum: 0.0,
    scrapwtsum: 0.0,

    editedIndex: -1,
    editedItem: {
      custcd: "",
      custnm: "",
      custsupply: "",
      custower: "",
      custtel: "",
      custadd: "",
    },

    defaultItem: {
      custcd: "",
      custnm: "",
      custsupply: "",
      custower: "",
      custtel: "",
      custadd: "",
    },

    CustSupplyFlag: [
      {
        custsupply: "Y",
      },
      {
        custsupply: "N",
      },
    ],

   


    fmenu: false,
    tmenu: false,
    modal: false,
    menu2: false,

    paraCustomerCode: "",
    paraCustomerName: "",
    paraCustomerOwner: "",
    paraCustomerSupply: "",
  }),

  computed: {
    formTitle() {

      return this.editedIndex === -1 ? "New Scrap Item" : "Edit Item";
    
    },

    OutformTitle() {

      return this.selectedRows.length > 0 ? "ITEM OUT" : "ITEMS NOT SELECTED";
    
    
    },

    mapMaterialCodeName11(code) {
      //return this.dsCatagoryCodeList(index).classnm
      let mt = code;
      
      this.MaterialType.forEach(item => {
        if (item.code === code) {
            mt = this.MaterialType.name;
        }
      });

     return mt;
    },

    ...mapState(["isLogin", "userInfo"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {

    initialize() {

      //get Item Code List
      this.fetchCustomerData();

      //SETUP MATERIAL TYPE
      
    },

    fetchCustomerData() {
      //let sdate = Date.now.

      if (this.fdate === "") {
        this.fdate = moment()
          .subtract(1, "days")
          .format("YYYYMMDD");
      }

      let params = {
          custcd: this.paraCustomerCode,
          custnm: this.paraCustomerName,
          custower: this.paraCustomerOwner,
          custsupply: this.paraCustomerSupply,
      };
        
      axios
        .post("/ktgProject/getVAE2115CustomerList.mdo", params)
        .then((response) => {
          this.dsTSCustomerList = response.data;

          /*
          this.tstotwtsum = 0.0;
          this.tsemptywtsum = 0.0;
          this.scrapwtsum = 0.0;
          this.dsScrapOutHistoryList.forEach((item) => {
            this.tstotwtsum   += Math.round(parseFloat(item.tstotwt));
            this.tsemptywtsum += Math.round(parseFloat(item.tsemptywt));
            this.scrapwtsum += Math.round(parseFloat(item.tsscrwt));
          })
          console.log("scrapwtsum");
          console.log(this.scrapwtsum);
          */
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },


    editItem(item) {
      this.editedIndex = this.dsTSCustomerList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.dsTSCustomerList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.dsTSCustomerList.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDialog3065() {
      this.dialog3065 = false;
    },


    OutDialogClose() {
      this.dialogOut = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },


    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        console.log(this.editedItem.scrapitem);
        Object.assign(this.dsTSCustomerList[this.editedIndex], this.editedItem);
      } else {
        console.log(this.editedItem.plastic1);
        console.log(this.editedItem.zone);
        this.dsTSCustomerList.push(this.editedItem);
      }
      this.close();
    },

    getColor(plastic1) {
      let retcolor  = "";

      if (plastic1 > 100) {
         retcolor = "orange";
      }
      if (plastic1 > 500) 
      {
         retcolor = "red";
      } 
      if (plastic1 < 100 ) { 
        retcolor = "green";
      }
      return retcolor;
    },
  },
};
</script>
