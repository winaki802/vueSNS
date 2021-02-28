<template>

  <div>
     <div>
        <v-div >
            <v-chip  flat class="ma-2 mp-2" close color="cyan" label text-color="white">
              <v-icon left>
                mdi-tag-outline
              </v-icon>
              Truck-Scale Item Code Management
            </v-chip>
        </v-div>
     </div> 
     <v-container >
        <div >
          <v-row>
            <v-col cols="12" md="12" lg="1" xl="1">
                <v-text-field v-model="paraItemCode" label="Item Code"></v-text-field>
            </v-col>              
            <v-col cols="12" sm="12" md="12" lg="1" xl="1">
            <v-select
                v-bind:items="dsCatagoryCodeList"
                v-model="paraCatagoryCode"
                item-text="classnm"
                item-value="classcd"
                label="Catagory"
                single-line
            />
            </v-col>

          <v-col cols="12" md="12" lg="1" xl="1">
            <v-text-field v-model="paraItemName" label="Item Name"></v-text-field>
          </v-col>
        <v-col cols="12" sm="12" md="12" lg="1" xl="1">
            <v-select
                v-bind:items="MaterialType"
                v-model="paraMaterialType"
                item-text="name"
                item-value="code"
                label="Material Type"
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
              @click="fetchItemCodeData()"
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
    :items="dsTSItemCodeList"
    v-model="selectedRows"
    item-key="code"
    fixed-header
    class="elevation-1"
  >
    <template v-slot:item.code="{item}">
      <v-chip  
        color="orange"
        label
        dark 
        outlined>
        {{ item.code }}
      </v-chip>
    </template>
    <template v-slot:item.classnm="{item}">
      <div style="width:150px;">
        <v-select
          v-bind:items="dsCatagoryCodeList" 
          item-text="classnm"
          v-model="item.classnm"
          single-line          
        />
      </div>
    </template>

    <template v-slot:item.materialtype="{item}">
      <div style="width:150px;">
        <v-select
          v-bind:items="MaterialType" 
          item-text="name"
          v-model="item.materialtype"
          single-line
          
        />
      </div>
    </template>

     <template v-slot:item.name="props">

        <v-edit-dialog
          :return-value.sync="props.item.name"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <h3 style="color:green;">{{ props.item.name }}</h3>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.name"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.spec="props">
        <v-edit-dialog
          :return-value.sync="props.item.spec"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.spec }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.spec"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.pawgt="props">
        <v-edit-dialog
          :return-value.sync="props.item.pawgt"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.pawgt }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.pawgt"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
  <template v-slot:item.rewgt="props">
        <v-edit-dialog
          :return-value.sync="props.item.rewgt"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.rewgt }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.rewgt"
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
            :content="dsScrapOutHistoryList.length"
            :value="dsScrapOutHistoryList.length"
            class="ma-2 mt-4"
            >
              ( Rows )
            </v-badge>
          </v-col>
          <v-col class ="ml-1" cols="1" sm="1" md="1" lg="1" xl="1">
            <v-badge
            color="green"
            content="totwt"
            class="ma-2 mt-4"
            > {{tstotwtsum}} (kg)
            </v-badge>
          </v-col>
          <v-col class ="ml-1" cols="1" sm="1" md="1" lg="1" xl="1">
            <v-badge
            color="green"
            content="empwt"
            class="ma-2 mt-4"
            > {{tsemptywtsum}} (kg)
            </v-badge>
          </v-col>
          <v-col class ="ml-1" cols="1" sm="1" md="1" lg="1" xl="1">
            <v-badge
            color="green"
            content="scrwt"
            class="ma-2 mt-4"
            > {{scrapwtsum}} (kg)
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
                        :items="dsScrapDataList"
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
      { text: "CODE", align: "start", value: "code" },
      { text: "CAT.CODE", align: "start", value: "matgu" },
      { text: "Catagory", value: "classnm" },
      { text: "MaterialType", value: "materialtype" },
      { text: "NAME", value: "name" },
      { text: "SPEC", align: "start", value: "spec" },      
      { text: "PALLETE WT(Kg)", value: "pawgt" },
      { text: "UNIT WT(Kg)", value: "rewgt" },
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


    dsScrapOutHistoryList: [],
    dsScrapDataList: [],
    dsCatagoryCodeList: [],
    dsTSItemCodeList: [],
    selectData: "",

    tstotwtsum: 0.0,
    tsemptywtsum: 0.0,
    scrapwtsum: 0.0,

    editedIndex: -1,
    editedItem: {
      code: "",
      classcd: "",
      israwmat: 0,
      name: "",
      spec: "",
      pawgt: "",
      rewgt: "",
    },

    defaultItem: {
      code: "",
      classcd: "",
      israwmat: 0,
      name: "",
      spec: "",
      pawgt: "",
      rewgt: "",
    },

    odsitems: [
      {
        name: "ODSCR1",
        id: 1,
      },
      {
        name: "ODSCR2",
        id: 2,
      },
    ],

    MaterialType: [
      {
        name: "All",
        code: 9,
      },
      {
        name: "Etc",
        code: 0,
      },
      {
        name: "RawMaterial",
        code: 1,
      },
      {
        name: "Scrap",
        code: 2,
      },
    ],


    fmenu: false,
    tmenu: false,
    modal: false,
    menu2: false,

    paraItemCode: "",
    paraCatagoryCode: "",
    paraItemName: "",
    paraMaterialType: "",
    selectOne: "ETC",

    paraZone: "",
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

      //get Catagory Code List 
      this.getCatagoryList();

      //get Item Code List
      this.fetchItemCodeData();

      //SETUP MATERIAL TYPE
      
    },

    getCatagoryList() {
        
      let token = localStorage.getItem("token");

      let config = {
        headers: {
          token: token,
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          itemcode: "all",
        },
      };

      axios
        .get("/ktgProject/getVAE2114CatagoryCodeList.mdo", config)
        .then((response) => {
          this.dsCatagoryCodeList = response.data;


        //summary footer 

          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      
    },

    fetchItemCodeData() {
      //let sdate = Date.now.
      let token = localStorage.getItem("token");

      if (this.fdate === "") {
        this.fdate = moment()
          .subtract(1, "days")
          .format("YYYYMMDD");
      }

      let config = {
        headers: {
          token: token,
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          code: this.paraItemCode,
          name: this.paraItemName,
          matgu: this.paraCatagoryCode,
          israwmat: this.paraMaterialType,
        },
      };

      axios
        .get("/ktgProject/selectVAE2111ItemList.mdo", config)
        .then((response) => {
          this.dsTSItemCodeList = response.data;

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
      this.editedIndex = this.dsScrapOutHistoryList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.dsScrapOutHistoryList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.dsScrapOutHistoryList.splice(this.editedIndex, 1);
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
        Object.assign(this.dsScrapOutHistoryList[this.editedIndex], this.editedItem);
      } else {
        console.log(this.editedItem.plastic1);
        console.log(this.editedItem.zone);
        this.dsScrapOutHistoryList.push(this.editedItem);
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
