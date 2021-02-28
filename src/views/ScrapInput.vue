<template>

  <div>
     <div>
        <v-div >
            <v-chip  flat class="ma-2 mp-2" close color="cyan" label text-color="white">
              <v-icon left>
                mdi-tag-outline
              </v-icon>
              Out-Door Scrap In & Out
            </v-chip>
        </v-div>
     </div> 
  <v-container >
        <div >
          <v-row>
            <v-col cols="12" md="12" lg="1" xl="1">
              <v-menu
              ref="fmenu"
              v-model="fmenu"
              :close-on-content-click="false"
              :return-value.sync="fdate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="fdate"
                  label="Fdate"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="fdate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="fmenu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.fmenu.save(fdate)">
                  OK
                </v-btn>
              </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="12" lg="1" xl="1">
             <v-menu
              ref="tmenu"
              v-model="tmenu"
              :close-on-content-click="false"
              :return-value.sync="tdate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="tdate"
                  label="Tdate"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="tdate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="tmenu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.tmenu.save(tdate)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            </v-col>
          <v-col cols="12" md="12" lg="1" xl="1">
            <v-text-field v-model="paraSer" label="Ser."></v-text-field>
          </v-col>
          <v-col cols="12" sm="1" >
            <v-select
              v-bind:items="statusType"
              v-model="paraStatus"
              item-text="name"
              label="Status"
              single-line
            />
          </v-col>
          <v-col cols="12" sm="1">
            <v-select
              v-bind:items="zoneitems"
              v-model="paraZone"
              item-text="name"
              label="ZONE"
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
              @click="fetchScrapData()"
            >
              Search
            </v-btn>
          </v-col>
          <v-col cols="12" sm="12" md="1" lg="1" xl="1">
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  align-content-start
                  flex-wrap
                  class="pa-1 ma-1"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-bind:items="odsitems"
                          v-model="editedItem.odsl"
                          item-text="name"
                          label="POS#"
                          single-line
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-bind:items="zoneitems"
                          v-model="editedItem.zone"
                          item-text="name"
                          label="ZONE"
                          single-line
                          @change="lf_changeScrapItems"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-bind:items="scrapitems"
                          v-model="editedItem.scrapitem"
                          item-text="name"
                          label="SCRAP ITEM"
                          single-line
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.plastic1"
                          label="Weight(Kg)"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="saveToServer">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="12" sm="12" md="1" lg="1" xl="1">
            <v-dialog v-model="dialogOut" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  align-content-start
                  flex-wrap
                  class="pa-1 ma-1"
                  v-bind="attrs"
                  v-on="on"
                >
                  Item Out
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ OutformTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-bind:items="tsPos"
                          v-model="outSelectedItem.tsPos"
                          item-text="name"
                          label="TSPOS#"
                          single-line
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="outSelectedItem.tstotwt"
                          label="TOTAL WT(kg)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="outSelectedItem.tsemptywt"
                          label="EMPTY WT(kg)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="outSelectedItem.tsscrwt"
                          label="SCRAP WT(kg)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="outSelectedItem.truckno"
                          label="TRUCK NO"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="outSelectedItem.scrcmpy"
                          label="SCRAP COMPANY"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="outSelectedItem.drvname"
                          label="DRIVER NAME"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="OutDialogClose">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="saveToQAC3070Server">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          
          </v-col>
          </v-row>
        </div>
  
  </v-container>
  <v-container>
  <v-data-table
    :headers="headers"
    :items="dsScrapDataList"
    sort-by="rowseq"
    :sort-desc="true"
    show-select
    v-model="selectedRows"
    :single-select="singleSelect"
    item-key="rowseq"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-switch
        v-model="singleSelect"
        label="Single select"
        class="pa-3"
      >
      </v-switch>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:item.plastic1="{ item }">
      <v-chip :color="getColor(item.plastic1)" dark>
        {{ item.plastic1.toLocaleString() }}
      </v-chip>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
    <template v-slot:footer>
      <div>
        <v-divider></v-divider>
        <v-row dense>
          <v-col class ="ml-1" cols="12" sm="12" md="1" lg="1" xl="1">
            <v-chip class="ma-2"
              color="green"
              text-color="white">
              TOTAL
            </v-chip>
          </v-col>
          <v-col class ="ml-1" cols="12" sm="12" md="1" lg="1" xl="1">
            <v-badge
            color="green"
            :content="dsScrapDataList.length"
            :value="dsScrapDataList.length"
            class="ma-2 mt-4"
            >
              ( Rows )
            </v-badge>
          </v-col>
          <v-col class ="ml-1" cols="12" sm="12" md="1" lg="1" xl="1">
            <v-badge
            color="green"
            content="wt"
            class="ma-2 mt-4"
            > {{scrapwtsum.toLocaleString()}} (kg)
            </v-badge>
          </v-col>
        </v-row>
      </div>
    </template>
  </v-data-table>
</v-container>

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
    dialogOut: false,

    headers: [
      { text: "InDate", align: "start", value: "intime" },
      { text: "SER", value: "rowseq" },
      { text: "STATUS", value: "status" },
      { text: "LOCATION", value: "odsl" },
      { text: "SCARP ZONE", value: "zone" },
      { text: "SCRAP ITEM", value: "scrapitem" },
      { text: "WT(Kg)", align: "end", value: "plastic1" },
      { text: "Id", align: "start", value: "chgname" },
      { text: "OutDate", align: "start", value: "outdattime" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],

    dsScrapDataList: [],
    selectData: "",
    scrapwtsum: 0.0,
    tscrapwtsum: '',

    editedIndex: -1,
    editedItem: {
      intime: "",
      rowseq: 0,
      odsl: "",
      zone: "",
      scrapitem: "",
      plastic1: 0,
      chgname: "",
    },

    outSelectedIndex: -1,
    outSelectedItem: {
      tsPos: "",
      tstotwt: 0,
      tsemptywt: 0,
      tsscrwt: 0,
      truckno: "",
      scrcmpy: "",
      drvname: "",
    },


    defaultItem: {
      intime: "",
      rowseq: 0,
      odsl: "",
      zone: "",
      scrapitem: "",
      plastic1: 0,
      chgname: "",
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

    tsPos: [
      {
        name: "TS1",
        id: 1,
      },
      {
        name: "TS2",
        id: 2,
      },
    ],

    zoneitems_org: [
      {
        name: "MIXING",
        id: 1,
      },
      {
        name: "APU(170)",
        id: 2,
      },
      {
        name: "F-CAL(120)",
        id: 3,
      },
      {
        name: "BODY-CUTTER(15A)",
        id: 4,
      },
      {
        name: "BELT-CUTTER(15B)",
        id: 5,
      },
      {
        name: "RUBBER-SLITTER(15M)",
        id: 6,
      },
      {
        name: "APEX(16A)",
        id: 7,
      },
      {
        name: "SWB(16B)",
        id: 8,
      },
      {
        name: "CAPPLY(16C)",
        id: 9,
      },
      {
        name: "FABRIC-INSERT(16F)",
        id: 10,
      },
    ],

    zoneitems: [
      {
        name: "MIXING",
        id: 1,
      },
      {
        name: "APU",
        id: 2,
      },
      {
        name: "F-CAL",
        id: 3,
      },
      {
        name: "BODY-CUTTER",
        id: 4,
      },
      {
        name: "BELT-CUTTER",
        id: 5,
      },
      {
        name: "RUBBER-SLITTER",
        id: 6,
      },
      {
        name: "APEX",
        id: 7,
      },
      {
        name: "SWB",
        id: 8,
      },
      {
        name: "CAPPLY",
        id: 9,
      },
      {
        name: "FABRIC-INSERT",
        id: 10,
      },
    ],



    scrapitems_org: [
      {
        name: "MIXING_MB(MB)",
        id: 1,
      },
      {
        name: "MIXING_FM(FM)",
        id: 2,
      },
      {
        name: "MIXING_RW(RW)",
        id: 3,
      },
      {
        name: "APU_FABRIC(H_FA)",
        id: 4,
      },
      {
        name: "APU_STEEL(H_ST)",
        id: 5,
      },
      {
        name: "APU_TREAD/SIDE(H_TR)",
        id: 6,
      },
      {
        name: "APU_INNER(H_SI)",
        id: 7,
      },
      {
        name: "APU_MIXRUB(H_MX)",
        id: 8,
      },
      {
        name: "REMILL_TREAD(M_TR)",
        id: 9,
      },
      {
        name: "REMILL_SIDE(M_SI)",
        id: 10,
      },
      {
        name: "REMILL_INNER(M_IN)",
        id: 11,
      },
      {
        name: "FCAL_TOPCORD(FB_TC)",
        id: 12,
      },
      {
        name: "FCAL_RAWCORD(RC_RC)",
        id: 13,
      },
      {
        name: "FCAL_RUBBER(RU_RU)",
        id: 14,
      },
      {
        name: "BELT_SCRAP(ST_BS)",
        id: 15,
      },
      {
        name: "BELT_RUBBER(ST_RU)",
        id: 16,
      },
      {
        name: "BODY_CUTTER(FB_FB)",
        id: 17,
      },
      {
        name: "BODY_RE-CUTTER(FB_RC)",
        id: 18,
      },
      {
        name: "RUBBER_SLITTER(SL_SL)",
        id: 19,
      },
      {
        name: "APEX_SCRAP(AP_AA)",
        id: 20,
      },
      {
        name: "APEX_REWORK(RR_RE)",
        id: 21,
      },
      {
        name: "BEAD_COAT(ST_CS)",
        id: 22,
      },
      {
        name: "BEAD_RUBBER(RU_RU)",
        id: 23,
      },
      {
        name: "BEAD_REWORK(RW_RW)",
        id: 24,
      },
      {
        name: "WIDE_CAPPLY(FB_WC)",
        id: 25,
      },
      {
        name: "MINI_CAPPLY(FB_MC)",
        id: 26,
      },
      {
        name: "FI_HIGHTABLE(FI_HT)",
        id: 27,
      },
      {
        name: "FI_FabricInsert(FI_FI)",
        id: 28,
      },
    ],

    scrapitems: [
      {
        name: "MIXING_MB",
        id: 1,
      },
      {
        name: "MIXING_FM",
        id: 2,
      },
      {
        name: "MIXING_RW",
        id: 3,
      },
      {
        name: "APU_FABRIC",
        id: 4,
      },
      {
        name: "APU_STEEL",
        id: 5,
      },
      {
        name: "APU_TREAD/SIDE",
        id: 6,
      },
      {
        name: "APU_INNER",
        id: 7,
      },
      {
        name: "APU_MIXRUB",
        id: 8,
      },
      {
        name: "REMILL_TREAD",
        id: 9,
      },
      {
        name: "REMILL_SIDE",
        id: 10,
      },
      {
        name: "REMILL_INNER",
        id: 11,
      },
      {
        name: "FCAL_TOPCORD",
        id: 12,
      },
      {
        name: "FCAL_RAWCORD",
        id: 13,
      },
      {
        name: "FCAL_RUBBER",
        id: 14,
      },
      {
        name: "BELT_SCRAP",
        id: 15,
      },
      {
        name: "BELT_RUBBER",
        id: 16,
      },
      {
        name: "BODY_CUTTER",
        id: 17,
      },
      {
        name: "BODY_RE-CUTTER",
        id: 18,
      },
      {
        name: "RUBBER_SLITTER",
        id: 19,
      },
      {
        name: "APEX_SCRAP",
        id: 20,
      },
      {
        name: "APEX_REWORK",
        id: 21,
      },
      {
        name: "BEAD_COAT",
        id: 22,
      },
      {
        name: "BEAD_RUBBER",
        id: 23,
      },
      {
        name: "BEAD_REWORK",
        id: 24,
      },
      {
        name: "WIDE_CAPPLY",
        id: 25,
      },
      {
        name: "MINI_CAPPLY",
        id: 26,
      },
      {
        name: "FI_HIGHTABLE",
        id: 27,
      },
      {
        name: "FI_FabricInsert",
        id: 28,
      },
    ],


    fdate: new Date().toISOString().substring(0,10),
    tdate: new Date().toISOString().substring(0,10),
    fmenu: false,
    tmenu: false,
    modal: false,
    menu2: false,
    paraSer: "",
    paraStatus: "",

    statusType: [
      {
        name: "IN",
        id: 1,
      },
      {
        name: "OUT",
        id: 2,
      },
    ],

    paraZone: "",
  }),

  computed: {
    formTitle() {

      return this.editedIndex === -1 ? "New Scrap Item" : "Edit Item";
    
    },

    OutformTitle() {

      return this.selectedRows.length > 0 ? "ITEM OUT" : "ITEMS NOT SELECTED";
    
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
      this.fetchScrapData();
    },
    fetchScrapData() {
      //let sdate = Date.now.
      let token = localStorage.getItem("token");

      //if (this.fdate === "") {
      //  this.fdate = moment()
      //    .subtract(1, "days")
      //    .format("YYYYMMDD");
      //}


      let parafdate = moment(this.fdate.toString())
        //.subtract(2, "days")
        .format("YYYYMMDD");

      let paratdate = moment(this.tdate.toString())
        //.subtract(1, "days")
        .format("YYYYMMDD");

      if (this.paraStatus === "IN") {
        this.paraStatus = "1";
      } else if (this.paraStatus === "OUT") {
        this.paraStatus = "2";
      }

      let config = {
        headers: {
          token: token,
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          fdate: parafdate,
          tdate: paratdate,
          rowseq: this.paraSer,
          status: this.paraStatus,
          zone: this.paraZone,
        },
      };

      axios
        .get("/ktgProject/selectQAC3065ODScrapList.mdo", config)
        .then((response) => {
          this.dsScrapDataList = response.data;

          this.scrapwtsum = 0.0;
          this.dsScrapDataList.forEach((item) => {
            this.scrapwtsum += Math.round(parseFloat(item.plastic1));
          })

          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    lf_changeScrapItems() {

      switch (this.editedItem.zone) {
        case "MIXING":
            //this.scrapitems = [];

            this.scrapitems = new Array({name: "MIXING_MB(MB)",id: 1,}, {name: "MIXING_FM(FM)",id: 2,},{name: "MIXING_RW(RW)",id: 3,});

            break
        case "APU":
              this.scrapitems = new Array(   {     name: "APU_FABRIC",     id: 4,   },   {     name: "APU_STEEL",     id: 5,   },   {     name: "APU_TREAD/SIDE",     id: 6,   },   {     name: "APU_INNER(H_SI)",     id: 7,   },   {     name: "APU_MIXRUB",     id: 8,   },   {     name: "REMILL_TREAD",     id: 9,   },   {     name: "REMILL_SIDE",     id: 10,   },   {     name: "REMILL_INNER",     id: 11,   }); 
           
          break;

        case "F-CAL":

            this.scrapitems = new Array(
                {
                  name: "FCAL_TOPCORD",
                  id: 12,
                },
                {
                  name: "FCAL_RAWCORD",
                  id: 13,
                },
                {
                  name: "FCAL_RUBBER",
                  id: 14,
                },                         
            );

          break;
          case "BODY-CUTTER":

            this.scrapitems = new Array(
              {
                  name: "BODY_CUTTER",
                  id: 17,
                },
                {
                  name: "BODY_RE-CUTTER",
                  id: 18,
                },
              );

          break;     

          case "BELT-CUTTER":

            this.scrapitems = new Array(
              {
                name: "BELT_SCRAP",
                id: 15,
              },
              {
                name: "BELT_RUBBER",
                id: 16,
              },              
            );

          break;     

          case "RUBBER-SLITTER":

            this.scrapitems = new Array(
              {
                name: "RUBBER_SLITTER",
                id: 19,
              },              
            );

          break;     

          case "APEX":

            this.scrapitems = new Array(
              {
                name: "APEX_SCRAP",
                id: 20,
              },
              {
                name: "APEX_REWORK",
                id: 21,
              },            
            );

          break;     

          case "SWB":

            this.scrapitems = new Array(
              {
                name: "BEAD_COAT",
                id: 22,
              },
              {
                name: "BEAD_RUBBER",
                id: 23,
              },
              {
                name: "BEAD_REWORK",
                id: 24,
              },
            );

          break;     

          case "CAPPLY":

            this.scrapitems = new Array(
              {
                name: "WIDE_CAPPLY",
                id: 25,
              },
              {
                name: "MINI_CAPPLY",
                id: 26,
              },

            );

          break;     

          case "FABRIC-INSERT":

            this.scrapitems = new Array(
              {
                name: "FI_HIGHTABLE",
                id: 27,
              },
              {
                name: "FI_FabricInsert",
                id: 28,
              },
            );

          break;     
      }
    },

    editItem(item) {
      
      this.editedIndex = this.dsScrapDataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.dsScrapDataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.dsScrapDataList.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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
        Object.assign(this.dsScrapDataList[this.editedIndex], this.editedItem);
      } else {
        console.log(this.editedItem.plastic1);
        console.log(this.editedItem.zone);
        this.dsScrapDataList.push(this.editedItem);
      }
      this.close();
    },
    saveToServer() {
      console.log("editIndex : " + this.editedIndex);
      if (this.editedIndex > -1) {
        console.log(this.editItem);
        //udpate items
      } else {

        console.log("editIndex : " + this.editedIndex);

        this.editedItem.chgname = this.userInfo.userid;

        console.log("editedItem");
        console.log(this.editedItem);

        let payloadInfo = {
          intime: "",
          rowseq: "",
          odsl: this.editedItem.odsl,
          zone: this.editedItem.zone,
          scrapitem: this.editedItem.scrapitem,
          plastic1: this.editedItem.plastic1,
          chgname: this.userInfo.userid,
        };

        axios
          .get("/ktgProject/insertQAC3065Data.mdo", { params: payloadInfo })
          .then((response) => {
            console.log(response.data);
            this.fetchScrapData();
          })
          .catch(() => {
            console.log("error");
          });

        this.close();
      }
    },

    saveToQAC3070Server() {
      
      console.log(this.outSelectedItem);

      if (this.outSelectedItem.length <= 0) {
        console.log('NO SELECTED ITEM ');
        //udpate items
      } else {
        this.editedItem.chgname = this.userInfo.userid;
        console.log("editedItem");
        console.log(this.editedItem);


        let cDate = new Date().toString();
        let paraOutSer = moment(cDate.toString()).format("YYYYMMDDHHmmss");

        let payloadInfo = {
          tsoutdat: "", //serever에서 입력
          outser: paraOutSer, 
          tsno: this.outSelectedItem.tsPos.substring(2,3),
          tstotwt: this.outSelectedItem.tstotwt,
          tsemptywt: this.outSelectedItem.tsemptywt,
          tsscrwt: this.outSelectedItem.tsscrwt,
          truckno: this.outSelectedItem.truckno,
          scrcmpy: this.outSelectedItem.scrcmpy,
          drvname: this.outSelectedItem.drvname,
          userid: this.userInfo.userid,
        };

        
        //QAC3070 INSERT ITEM OUT HISTORY
       
        axios
          .get("/ktgProject/insertQAC3070Data.mdo", { params: payloadInfo })
          .then((response) => {
            console.log(response.data);
            //this.fetchScrapData();
          })
          .catch(() => {
            console.log("error");
        });

      console.log("selectedRows")
      console.log(this.selectedRows)
        this.selectedRows.forEach((item) => {
            item.outser = paraOutSer;
        })

      console.log("selectedRows2")
      console.log(this.selectedRows)

        // console.log(this.)
        // => QAC3065 UPDATE OUT INFOR. FOR JOIN QAC3070 WITH KEY OUTROWSEQ
        axios
          .post("/ktgProject/updateQAC3065Data.mdo", this.selectedRows)
          .then((response) => {
            console.log(response.data);
            this.fetchScrapData();
            this.selectedRows = [];
          })
          .catch(() => {
            console.log("error");
        });

        this.OutDialogClose();
      }
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
