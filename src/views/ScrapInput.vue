<template>
  <v-data-table
    :headers="headers"
    :items="dsScrapDataList"
    sort-by="rowseq"
    :sort-desc= "true"
    class="elevation-1"
  >
    <div>
      <h1>winaki</h1>
    </div>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>SCRAP DISPLAY</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog>

        </v-dialog>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      v-bind:items="odsitems"
                      v-model="editedItem.odsl"
                      item-text="name"
                      label="POS#"
                      single-line
                      />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      v-bind:items="zoneitems"
                      v-model="editedItem.zone"
                      item-text="name"
                      label="ZONE"
                      single-line
                      />
                  </v-col>
                 <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      v-bind:items="scrapitems"
                      v-model="editedItem.scrapitem"
                      item-text="name"
                      label="SCRAP ITEM"
                      single-line
                    />
                  </v-col>               
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
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
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="saveToServer"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:item.plastic1="{ item }">
      <v-chip
        :color="getColor(item.plastic1)"
        dark
      >
        {{item.plastic1}}
      </v-chip>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  import axios from 'axios'
  import {mapState} from  "vuex"
  import moment from 'moment';

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'InDate', align: 'start', value: 'intime', },
        { text: 'SER', value: 'rowseq' },
        { text: 'LOCATION', value: 'odsl' },
        { text: 'SCARP ZONE', value: 'zone' },
        { text: 'SCRAP ITEM', value: 'scrapitem' },
        { text: 'WT(Kg)', align: 'end', value: 'plastic1' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],

      dsScrapDataList: [],
      selectData: '',

      editedIndex: -1,
      editedItem: {
        intime: '',
        rowseq: 0,
        odsl: '',
        zone: '',
        scrapitem: '',
        plastic1: 0,
        chgname: ''
      },
      defaultItem: {
        intime: '',
        rowseq: 0,
        odsl: '',
        zone: '',
        scrapitem: '',
        plastic1: 0,
        chgname:''
      },

      odsitems: [
        {
          name: 'ODSCR1',
          id: 1
        },
        {
          name: 'ODSCR2',
          id: 2
        },
      ],
      zoneitems: [
        {
            name: 'MIXING',
            id: 1
        },
       {
            name: 'APU(170)',
            id: 2
        },
        {
            name: 'F-CAL(120)',
            id: 3
        },
        {
            name: 'BODY-CUTTER(15A)',
            id: 4
        },
        {
            name: 'BELT-CUTTER(15B)',
            id: 5
        },
        {
            name: 'RUBBER-SLITTER(15M)',
            id: 6
        },        
        {
            name: 'APEX(16A)',
            id: 7
        },        
        {
            name: 'SWB(16B)',
            id: 8
        },        
        {
            name: 'CAPPLY(16C)',
            id: 9
        },        
        {
            name: 'FABRIC-INSERT(16F)',
            id: 10
        },        
      ],

      scrapitems: [
       {
            name: 'MIXING_MB(MB)',
            id: 1
        },
       {
            name: 'MIXING_FM(FM)',
            id: 2
        },
       {
            name: 'MIXING_RW(RW)',
            id: 3
        },
       {
            name: 'APU_FABRIC(H_FA)',
            id: 4
        },
        {
            name: 'APU_STEEL(H_ST)',
            id: 5
        },
        {
            name: 'APU_TREAD/SIDE(H_TR)',
            id: 6
        },
        {
            name: 'APU_INNER(H_SI)',
            id: 7
        },
        {
            name: 'APU_MIXRUB(H_MX)',
            id: 8
        },
        {
            name: 'REMILL_TREAD(M_TR)',
            id: 9
        },
        {
            name: 'REMILL_SIDE(M_SI)',
            id: 10
        },
        {
            name: 'REMILL_INNER(M_IN)',
            id: 11
        },
        {
            name: 'FCAL_TOPCORD(FB_TC)',
            id: 12
        },
        {
            name: 'FCAL_RAWCORD(RC_RC)',
            id: 13
        },
        {
            name: 'FCAL_RUBBER(RU_RU)',
            id: 14
        },
        {
            name: 'BELT_SCRAP(ST_BS)',
            id: 15
        },
        {
            name: 'BELT_RUBBER(ST_RU)',
            id: 16
        },
        {
            name: 'BODY_CUTTER(FB_FB)',
            id: 17
        },
        {
            name: 'BODY_RE-CUTTER(FB_RC)',
            id: 18
        },
        {
            name: 'RUBBER_SLITTER(SL_SL)',
            id: 19
        },
        {
            name: 'APEX_SCRAP(AP_AA)',
            id: 20
        },
        {
            name: 'APEX_REWORK(RR_RE)',
            id: 21
        },
        {
            name: 'BEAD_COAT(ST_CS)',           
            id: 22
        },
        {
            name: 'BEAD_RUBBER(RU_RU)',
            id: 23
        },
         {
            name: 'BEAD_REWORK(RW_RW)',
            id: 24
        },
        {
            name: 'WIDE_CAPPLY(FB_WC)',
            id: 25
        },
        {
            name: 'MINI_CAPPLY(FB_MC)',
            id: 26
        },
        {
            name: 'FI_HIGHTABLE(FI_HT)',
            id: 27
        },
        {
            name: 'FI_FabricInsert(FI_FI)',
            id: 28
        },

      ],


      scritems: [
       {
            name: 'BELT_A',
            id: 1
        },
        {
            name: 'BELT_B',
            id: 2
        },
        {
            name: 'APEX_A',
            id: 3
        },
        {
            name: 'APEX_B',
            id: 4
        },
        {
            name: 'APU_A',
            id: 5
        },
        {
            name: 'APU_B',
            id: 6
        }

      ]

      
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Scrap Item' : 'Edit Item'
      },
      ...mapState(["isLogin", "userInfo"])
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize();
    },

    methods: {
      initialize () {
          this.fetchScrapData();
   
      },
      fetchScrapData() {

      //let sdate = Date.now.
      let token = localStorage.getItem("token")
      let config = {
        headers: {
          "token": token,
          "Access-Control-Allow-Origin": "*"
        },
        params: {
          "wdate": moment().subtract(1,'days').format("YYYYMMDD"),
        }
      }
      
      axios
        .get("/ktgProject/selectQAC3065ODScrapList.mdo", config)
        .then(response => {
          this.dsScrapDataList = response.data;
          console.log(response.data);

        })
        .catch((error) => {
          console.log(error)
        })
      },

      editItem (item) {
        this.editedIndex = this.dsScrapDataList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.dsScrapDataList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.dsScrapDataList.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          console.log(this.editedItem.scrapitem)
          Object.assign(this.dsScrapDataList[this.editedIndex], this.editedItem)
        }
        else {
          console.log(this.editedItem.plastic1)
          console.log(this.editedItem.zone)
          this.dsScrapDataList.push(this.editedItem)
        }
        this.close()
      },
       saveToServer () {
         console.log(this.editedIndex)
        if (this.editedIndex > -1) {
          console.log(this.editItem);
          //udpate items
        }            
        else {
          
          this.editedItem.chgname = this.userInfo.userid;
          console.log("editedItem");
          console.log(this.editedItem);
          
        let payloadInfo = {
          intime: '',
          rowseq: '',
          odsl: this.editedItem.odsl,
          zone: this.editedItem.zone,
          scrapitem: this.editedItem.scrapitem,
          plastic1: this.editedItem.plastic1,
          chgname: this.userInfo.userid
        }

          axios
            .get("/ktgProject/insertQAC3065Data.mdo", {params: payloadInfo})
            .then(response => {
              console.log(response.data);
              this.fetchScrapData();
            })
            .catch(() => {
              console.log('error');
            })
          
          this.close()
        }
      },
      getColor(plastic1) {
        if (plastic1 > 100) return 'orange'
        else if (plastic1 > 200) return 'red'
        else return 'green' 
      }
    },
  }
</script>