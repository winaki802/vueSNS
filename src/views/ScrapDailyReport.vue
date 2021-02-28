<template>

  <div>
     <div>
        <v-div >
            <v-chip  flat class="ma-2 mp-2" close color="cyan" label text-color="white">
              <v-icon left>
                mdi-tag-outline
              </v-icon>
              Out-Door Scrap Out History
            </v-chip>
        </v-div>
     </div> 
     <v-container >
        <div >
          <v-row>
            <v-col cols="12" md="12" lg="2" xl="1">
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
            <v-col cols="12" md="12" lg="2" xl="1">
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
            <v-col cols="12" sm="12" md="12" lg="1" xl="1">
            <v-select
                v-bind:items="tsPos"
                v-model="paraTsNo"
                item-text="name"
                label="TSPOS#"
                single-line
            />
            </v-col>

          <v-col cols="12" md="12" lg="1" xl="1">
            <v-text-field v-model="paraScrCmpy" label="SCRAP COMPANY"></v-text-field>
          </v-col>
          <v-col cols="12" md="12" lg="1" xl="1">
            <v-text-field v-model="paraDrvName" label="DRIVER NAME"></v-text-field>
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
          </v-row>
        </div>
  
  </v-container>
  <v-container>
  <v-data-table
    :headers="headers"
    :items="dsScrapOutHistoryList"
    sort-by="tsdattm"
    :sort-desc="true"
    v-model="selectedRows"
    item-key="tsdattm"
    class="elevation-1"
  >
    <template v-slot:item.outser="{ item }">
        <v-btn
            color="indigo"
            align-content-start
            outlined
            class="ma-2"
            @click="fetchScrapOutHistory(item.outser)"
        >
            {{item.outser}}
        </v-btn>
    </template>
    <template v-slot:item.tstotwt="{ item }">
      <v-chip :color="getColor(item.tstotwt)" dark>
        {{ item.tstotwt.toLocaleString() }}
      </v-chip>
    </template>
    <template v-slot:item.tsemptywt="{ item }">
      <v-chip :color="getColor(item.tsemptywt)" dark>
        {{ item.tsemptywt.toLocaleString() }}
      </v-chip>
    </template>
    <template v-slot:item.tsscrwt="{ item }">
      <v-chip :color="getColor(item.tsscrwt)" dark>
        {{ item.tsscrwt.toLocaleString() }}
      </v-chip>
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
            > {{tstotwtsum.toLocaleString()}} (kg)
            </v-badge>
          </v-col>
          <v-col class ="ml-1" cols="1" sm="1" md="1" lg="1" xl="1">
            <v-badge
            color="green"
            content="empwt"
            class="ma-2 mt-4"
            > {{tsemptywtsum.toLocaleString()}} (kg)
            </v-badge>
          </v-col>
          <v-col class ="ml-1" cols="1" sm="1" md="1" lg="1" xl="1">
            <v-badge
            color="green"
            content="scrwt"
            class="ma-2 mt-4"
            > {{scrapwtsum.toLocaleString()}} (kg)
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
                            {{ item.plastic1.toLocaleString() }}
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
      { text: "OUTDATE", align: "start", value: "tsoutdat" },
      { text: "OUT TIME", value: "tsdattm" },
      { text: "T/S NO.", value: "tsno" },
      { text: "OUT SerialNo.", align: "center", value: "outser" },      
      { text: "TOTAL WT(Kg)", value: "tstotwt" },
      { text: "EMPTY WT(Kg)", value: "tsemptywt" },
      { text: "SCRAP WT(Kg)", value: "tsscrwt" },
      { text: "TRUCK NO", align: "start", value: "truckno" },
      { text: "COMPANY", align: "start", value: "scrcmpy" },
      { text: "DRIVER NAME", align: "start", value: "drvname" },
      { text: "USERID", align: "start", value: "userid" },
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
    selectData: "",

    tstotwtsum: 0.0,
    tsemptywtsum: 0.0,
    scrapwtsum: 0.0,

    editedIndex: -1,
    editedItem: {
      tsdattm: "",
      outser: "",
      tstotwt: 0,
      tsemptywt: 0,
      tsscrwt: 0,
      scrcmpy: "",
      truckno: "",
      drvname: "",
    },

    defaultItem: {
      tsdattm: "",
      outser: "",
      tstotwt: 0,
      tsemptywt: 0,
      tsscrwt: 0,
      scrcmpy: "",
      truckno: "",
      drvname: "",
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

    zoneitems: [
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

 
    scrapitems: [
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

    fdate: new Date().toISOString().substring(0,10),
    tdate: new Date().toISOString().substring(0,10),
    fmenu: false,
    tmenu: false,
    modal: false,
    menu2: false,
    paraTsNo: "",
    paraScrCmpy: "",
    paraDrvName: "",

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

        console.log("winaki");
      let config = {
        headers: {
          token: token,
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          fdate: parafdate,
          tdate: paratdate,
          tsno: this.paraTsNo.substring(2,3),
          scrcmpy: this.paraScrCmpy,
          drvname: this.paraDrvName,
        },
      };

      axios
        .get("/ktgProject/selectQAC3070ScrapOutHistoryList.mdo", config)
        .then((response) => {
          this.dsScrapOutHistoryList = response.data;

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

          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    fetchScrapOutHistory(paraOutSer) {

      this.dialog3065 = true //dialog enable.

      let payloadInfo = {
          outser: paraOutSer, 
        };

      axios
        .get("/ktgProject/selectQAC3065ScrapOutDetail.mdo", {params: payloadInfo })
        .then((response) => {
          this.dsScrapDataList = response.data;
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
