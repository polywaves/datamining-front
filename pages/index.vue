<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="block">
        <div class="columns">
          <div class="column">
            <h4 class="title is-4">{{ loggedInUser.clinic }}</h4>
          </div>
          <div class="column">
            <h4 class="title is-4">{{ loggedInUser.name }}</h4>
          </div>
        </div>
      </div>

      <form id="Form" @submit="submit">
        <div class="block">
          <div class="columns">
            <div v-for="(field, index) in form.top" :key="field.label" v-bind:class="'column is-one-quarter ' + field.columnClass">
              <FormField v-bind:field="field" v-bind:index="'top.' + index"  @update-field="updateField" />
            </div>
          </div>
        </div>

        <div class="block">
          <div class="columns">
            <div class="column has-background-light">
              <h4 class="title is-4">ПРАВЫЙ ГЛАЗ</h4>

              <div class="columns is-multiline is-variable is-3">
                <div v-for="(field, index) in form.eyes.right" :key="field.label" v-bind:class="'column is-one-quarter ' + field.columnClass">
                  <FormField v-bind:field="field" v-bind:index="'eyes.right.' + index" @update-field="updateField" />
                </div>
              </div>
            </div>

            <div class="column has-background-info-light">
              <h4 class="title is-4">ЛЕВЫЙ ГЛАЗ</h4>

              <div class="columns is-multiline is-variable is-3">
                <div v-for="(field, index) in form.eyes.left" :key="field.label" v-bind:class="'column is-one-quarter ' + field.columnClass">
                  <FormField v-bind:field="field" v-bind:index="'eyes.left.' + index" @update-field="updateField" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="block">
          <div class="columns">
            <div class="column is-5 has-background-warning-light">
              <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-size-7">
                <thead>
                <tr>
                  <th></th>
                  <th>Формула</th>
                  <th>Recom</th>
                  <th>Residual</th>
                  <th>Em</th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="(field, index) in form.resources.left" :key="field.name">
                  <td>
                    <FormField v-bind:field="field" v-bind:index="'resources.left.' + index" @update-field="updateField" />
                  </td>
                  <td>{{ field.name }}</td>
                  <td>{{ results.left[index] ? results.left[index]['recom'] : '' }}</td>
                  <td>{{ results.left[index] ? results.left[index]['residual'] : '' }}</td>
                  <td>{{ results.left[index] ? results.left[index]['em'] : '' }}</td>
                </tr>
                </tbody>
              </table>
            </div>

            <div class="column is-2">
              <div class="buttons">
                <button type="submit" class="button is-success is-fullwidth">
                  <span>РАСЧЕТ</span>
                </button>

                <button class="button is-primary is-fullwidth" v-on:click="print">
                  <span>ПЕЧАТЬ</span>
                </button>
              </div>
            </div>

            <div class="column is-5 has-background-success-light">
              <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-size-7">
                <thead>
                <tr>
                  <th></th>
                  <th>Формула</th>
                  <th>Recom</th>
                  <th>Residual</th>
                  <th>Em</th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="(field, index) in form.resources.right" :key="field.name">
                  <td>
                    <FormField v-bind:field="field" v-bind:index="'resources.right.' + index" @update-field="updateField" />
                  </td>
                  <td>{{ field.name }}</td>
                  <td>{{ results.right[index] ? results.right[index]['recom'] : '' }}</td>
                  <td>{{ results.right[index] ? results.right[index]['residual'] : '' }}</td>
                  <td>{{ results.right[index] ? results.right[index]['em'] : '' }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import FormField from '~/components//Form/Field'
import FormResourceTable from '~/components/ResourceTable'
import { mapGetters } from 'vuex'

export default {
  name: "IndexPage",
  middleware: 'auth',
  components: {
    FormField,
    FormResourceTable
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  data () {
    const template = {
      eye: {
        r1: {
          name: 'r1',
          label: 'R1 (мм)',
          rules: {
            min: 4.7,
            max: 22.1,
            step: 0.01
          },
          type: 'number',
          value: 6,
          columnClass: 'is-4'
        },
        k1: {
          name: 'k1',
          label: 'K1 (D)',
          rules: {
            min: 15,
            max: 70,
            step: 0.01
          },
          type: 'number',
          value: 42.62,
          columnClass: 'is-4'
        },
        ax1: {
          name: 'ax1',
          label: 'Ax1 (°)',
          rules: {
            min: 0,
            max: 180,
            step: 0.01
          },
          type: 'number',
          value: '',
          columnClass: 'is-4'
        },

        r2: {
          name: 'r2',
          label: 'R2 (мм)',
          rules: {
            min: 4.7,
            max: 22.1,
            step: 0.01
          },
          type: 'number',
          value: 7,
          columnClass: 'is-4'
        },
        k2: {
          name: 'k2',
          label: 'K2 (D)',
          rules: {
            min: 15,
            max: 70,
            step: 0.01
          },
          type: 'number',
          value: 43.75,
          columnClass: 'is-4'
        },
        ax2: {
          name: 'ax2',
          label: 'Ax2 (°)',
          rules: {
            min: 0,
            max: 180,
            step: 0.01
          },
          type: 'number',
          value: '',
          columnClass: 'is-4'
        },


        n: {
          name: 'n',
          label: 'n',
          type: 'select',
          items: ['1,3315', '1,3320', '1,3360', '1,3375', '1,3380'],
          value: 1,
          columnClass: 'is-6'
        },
        kMeter: {
          name: 'kMeter',
          label: 'K-метер',
          rules: {
            required: true
          },
          type: 'select',
          items: [
            'Lenstar',
            'Eyestar',
            'IOLMaster500',
            'IOLMaster700',
            'AL-scan',
            'OA2000',
            'Aladdin',
            'PentacamAXL',
            'GalileiG6',
            'Argos',
            'Anterion',
            'other'
          ],
          value: 5,
          columnClass: 'is-6'
        },


        al: {
          name: 'al',
          label: 'AL (мм)',
          rules: {
            min: 10,
            max: 50,
            step: 0.01
          },
          type: 'number',
          value: 23.37,
          columnClass: 'is-6'
        },
        acd: {
          name: 'acd',
          label: 'ACD (мм)',
          rules: {
            min: 0.5,
            max: 6,
            step: 0.01
          },
          type: 'number',
          value: 3.34,
          columnClass: 'is-6'
        },

        aConst: {
          name: 'aConst',
          label: 'A-const',
          rules: {
            min: 90,
            max: 140,
            step: 0.01
          },
          type: 'number',
          value: 118.51,
          columnClass: 'is-6'
        },
        target: {
          name: 'target',
          label: 'Цель (D)',
          rules: {
            min: -20,
            max: 20,
            step: 0.01
          },
          type: 'number',
          value: '',
          columnClass: 'is-6'
        },

        wtw: {
          name: 'wtw',
          label: 'WTW (мм)',
          rules: {
            min: 8,
            max: 16,
            step: 0.01
          },
          type: 'number',
          value: '',
          columnClass: 'is-4'
        },
        cct: {
          name: 'cct',
          label: 'CCT (мкм)',
          rules: {
            min: 300,
            max: 650,
            step: 0.01
          },
          type: 'number',
          value: '',
          columnClass: 'is-4'
        },
        lt: {
          name: 'lt',
          label: 'LT (мм)',
          rules: {
            min: 2,
            max: 9,
            step: 0.01
          },
          type: 'number',
          value: '',
          columnClass: 'is-4'
        }
      },

      resources: {
        'Haigis': {
          name: 'Haigis',
          type: 'checkbox',
          value: true,
        },
        'HofferQ': {
          name: 'HofferQ',
          type: 'checkbox',
          value: true,
        },
        'Kane': {
          name: 'Kane',
          type: 'checkbox',
          value: true,
        },
        'Micof': {
          name: 'Micof',
          type: 'checkbox',
          value: true,
        },
        'Holl': {
          name: 'Holl',
          type: 'checkbox',
          value: true,
        },
        'Barrett': {
          name: 'Barrett',
          type: 'checkbox',
          value: true,
        },
        // 'Hill-RBF': {
        //   name: 'Hill-RBF',
        //   type: 'checkbox',
        //   value: true,
        // }
      }
    }

    return {
      results: {
        left: {},
        right: {},
      },

      clinicName: '',
      surgeonName: '',

      form: {
        resources: {
          left: JSON.parse(JSON.stringify(template.resources)),
          right: JSON.parse(JSON.stringify(template.resources))
        },

        top: {
          patientId: {
            name: 'patientId',
            label: 'ID пациента',
            rules: {
              step: 1
            },
            type: 'number',
            value: '',
            columnClass: 'is-4'
          },
          patientBirthday: {
            name: 'patientBirthday',
            label: 'Дата рождения пациента',
            type: 'date',
            value: '',
            columnClass: 'is-4'
          },
          patientGender: {
            name: 'patientGender',
            label: 'Пол пациента',
            type: 'select',
            items: ['Мужской', 'Женский'],
            value: 0,
            columnClass: 'is-4'
          },
        },

        eyes: {
          left: JSON.parse(JSON.stringify(template.eye)),
          right: JSON.parse(JSON.stringify(template.eye))
        }
      }
    }
  },
  methods: {
    updateField(value, index) {
      const parts = index.split('.')

      if (parts.length === 1) {
        this.form[parts[0]].value = value

        console.log(this.form[parts[0]])
      } else if (parts.length === 2) {
        this.form[parts[0]][parts[1]].value = value

        console.log(this.form[parts[0]][parts[1]])
      } else if (parts.length === 3) {
        this.form[parts[0]][parts[1]][parts[2]].value = value

        console.log(this.form[parts[0]][parts[1]][parts[2]])
      }
    },

    print() {
      window.print()
    },

    async submit(event) {
      if (event.target.checkValidity()) {
        event.preventDefault()

        const args = {
          url: '/api/data/calc',
          method: 'POST',
          data: this.form
        }

        const response = await this.$axios(args)

        const results = {
          left: {},
          right: {}
        };
        for (const key in response.data.result['calc']) {
          const resource = response.data.result['calc'][key]

          if (resource.left) {
            results.left[key] = {
              em: resource.left['em'],
              recom: resource.left['recom'],
              residual: resource.left['residual'],
            }
          }

          if (resource.right) {
            results.right[key] = {
              em: resource.right['em'],
              recom: resource.right['recom'],
              residual: resource.right['residual'],
            }
          }
        }

        this.results = results
      }
    }
  }
}
</script>

<style scoped>
h4 {
  color: cornflowerblue;
}
</style>

