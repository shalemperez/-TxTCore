![!TxTCore logo](https://c-ven.com/images/!txtcore-logo.png)


!TxtCore es un framework para la **facil** lectura y escritura de información hacia **Dynamics CRM 365 Online**, mediante la manipulación de etiquetas HTML en los diferentes atributos a utilizar. Este Framework ahorra desde un 80% a un 85% de tiempo en el creado de formularios.

## Dependencias

 1. Core base de StockCloud en laravel
 2. AlexaCRM
 3. Vue

## Instalación
`npm i txtcore`

## Preparación

Dentro del componente de Vue y dentro del template, debe colocarse el siguiente form con los siguientes atributos:
```
<form id="contentform" 
	ref="form"
	v-on:keydown.enter.prevent="handleChange"
	@submit.prevent="send"
	@change="handleChange"
	@invalid.capture.prevent="handleInvalid">
	[CONTENIDO]
</form>
```
Todos estos atributos son para poder validar correctamente que los campos requeridos tengan informacion. El campo que sirve de identificador para procesar la data es **id="contentform"**. Este campo es requerido para el correcto funcionamiento de !TxTCore.

Dentro del instanciamiento del componente, dentro del metodo **data**, deben colocarse las siguientes variables, como se muestra a continuación
```
data() {
    return {
        fieldErrors: {},
        form_data: {},
        form_optionsets: {},
        form_entityreference: {},
        form_boolean: {},
        form_radio: {}
    }
}
```
La primer valiables es para procesar las validaciones de los campos requeridos. Las demas variables son para guardar la información proveniente de !TxTCore.

Los siguientes métodos deben estan colocados dentro de la sección **methods** en el componente de Vue

 1. send
 2. getfromcrm
 3. posttocrm
 4. handleSignup
 5. handleChange
 6. handleInvalid
 7. errorClass
 8. showConsole

Estos métodos pueden ser encontrados en el componente **DashboardComponent.vue**.

## Elementos HTML soportados

 1. Input de tipo texto
 2. Select de tipo optionset
 3. Select de tipo entity reference
 4. Select de tipo boolean
 5. Input de tipo fecha
 6. textarea
 7. checkbox
 8. Radio button

## Atributos requeridos
Todo elemento HTML debe tener los siguientes atributos

 - `type="select"`
	 - Indica el tipo de campo a procesar.
 - `class="form-control form-control-lg"` 
	 - Este atributo es para colocar el estilo deseado.
 - `entity="lead"`
	 3. Indica a que entidad leera y sera posteada la información.
 - `name="firstname"`
	 4. Indica a que campo de CRM se posteara la información.
 - `id="firstname"`
	 5. campo unico para identificar el campo a nivel de html y css.
 - `v-model="form_data.firstname"`
	 - Indica a donde Vue guardara y leera información del campo.
 - `:class="errorClass('firstname')"`
	 - Campo requerido para mostrar la validación HTML de un campo.
 - `required`
	 - Atributo para indicar si un campo es requerido o no.
 - `:disabled="this.$store.state.loading"`
	 - Atributo para desabilitar el campo mientras se procesa su información

## Atributos especiales
- `fieldtype="entityreference"`
	- Indica el tipo de campo a procesar cuando el elemento ya ocupa el atributo **type**, este atributo aplica para los elementos de tipo:
		- Entity reference
		- Boolean
		- Input de tipo fecha personalizado  *(no html convencional)*
		- Optionset
- `from-entity="new_pais"`
	- Indica de que entidad será traida la información, sirve tambien para hacer la relación al momento de postear la data a CRM.
	- El elemento entity referente tambien requiere los siguientes elementos:
		- `entity-filter="new_name"`
		- `entity-atribute="new_pais"`
		- `entity-id="new_paisid"`
		- `entity-name="new_name"`
		- `entity-first="República Dominicana"`
			- Este ultimo campo es **opcional** y sirve para colocar una opción de primero
- `ignore`
	- Este atributo se puede usar para ignorar un elemento en el procesamiento, tanto para enviar como para recibir información.

## Ejemplos de tipos de campos

### Ejemplo: Input de tipo texto
```
<input type="text"
	class="form-control form-control-lg"
	entity="lead"
	name="firstname"
	id="firstname"
	v-model="form_data.firstname"
	:class="errorClass('firstname')"
	required
	:disabled="this.$store.state.loading"
	:placeholder="this.$store.state.loading ? 'Cargando ...' : ''"
>
```
### Ejemplo: Select de tipo optionset
```
<select type="select"
	fieldtype="optionset"
	class="form-control form-control-lg"
	entity="lead"
	name="new_suma_nivelacademico"
	id="new_suma_nivelacademico"
	v-model="form_data.new_suma_nivelacademico"
	:class="errorClass('new_suma_nivelacademico')"
	required
	:disabled="this.$store.state.loading"
	:placeholder="this.$store.state.loading ? 'Cargando ...' : ''"
	>
		<option value="" hidden>{{this.$store.state.loading ? 'Cargando...' : 'Selecciona una opción'}}</option>
		<option v-for="(value, index) in form_optionsets.new_suma_nivelacademico" :key="index" :value="value.split(',')[0]">{{value.split(',')[1]}}</option>
</select>
```
### Ejemplo: Select de tipo entity reference
```
<select type="select"
    fieldtype="entityreference"
    from-entity="new_pais"
    entity-filter="new_name"
    entity-atribute="new_pais"
    entity-id="new_paisid"
    entity-name="new_name"
    entity-first="República Dominicana"
    class="form-control form-control-lg"
    entity="lead"
    name="new_pasderesidencia"
    id="new_pasderesidencia"
    v-model="form_data.new_pasderesidencia"
    :class="errorClass('new_pasderesidencia')"
    required
    :disabled="this.$store.state.loading"
    :placeholder="this.$store.state.loading ? 'Cargando ...' : ''"
>
    <option value="" hidden>{{this.$store.state.loading ? 'Cargando...' : 'Selecciona una opción'}}</option>
    <option v-for="(value, index) in form_entityreference.new_pasderesidencia" :key="index" :value="value.split(',')[0]">{{value.split(',')[1]}}</option>
</select>
```
### Ejemplo: Select de tipo boolean
```
<select type="select"
    fieldtype="boolean"
    class="form-control form-control-lg"
    entity="lead"
    name="new_ciudadanooresidenteeeuu"
    id="new_ciudadanooresidenteeeuu"
    v-model="form_data.new_ciudadanooresidenteeeuu"
    :class="errorClass('new_ciudadanooresidenteeeuu')"
    required
    :disabled="this.$store.state.loading"
    :placeholder="this.$store.state.loading ? 'Cargando ...' : ''"
>
    <option value="" hidden>{{this.$store.state.loading ? 'Cargando...' : 'Selecciona una opción'}}</option>
    <option v-for="(value, index) in form_boolean.new_ciudadanooresidenteeeuu" :key="index" :value="value.split(',')[0]">{{value.split(',')[1]}}</option>
</select>
```
### Ejemplo: Input de tipo fecha custom
Para poder utilizar el elementos custom de fecha debe incluirse al inicio de la etiqueta **script** lo siguiente:
```
import  DatePicker  from  'vue2-datepicker';
import  'vue2-datepicker/index.css';
import  'vue2-datepicker/locale/es';
```
Ejemplo:
```
<date-picker :clearable="false" 
    input-class="form-control form-control-lg"
    value-type="YYYY-MM-DD" 
    format="DD/MM/YYYY" 
    :class="errorClass('new_fechadenacimiento')" 
    :placeholder="this.$store.state.loading ? 'Cargando...' : '__/__/__'" 
    v-model="form_data.new_fechadenacimiento" 
    :disabled="this.$store.state.loading" 
    :input-attr="{
        required: true, 
        name: 'new_fechadenacimiento', 
        id :'new_fechadenacimiento', 
        fieldtype:'date',
        entity:'lead'
    }"
></date-picker>
```
### Ejemplo: Input de tipo fecha html5
```
<input type="date" 
    class="form-control form-control-lg"
    id="new_fechaexpiracioncedula"
    entity="lead"
    name="new_fechaexpiracioncedula" 
    :class="errorClass('new_fechaexpiracioncedula')" 
    :placeholder="this.$store.state.loading ? 'Cargando...' : '__/__/__'" 
    v-model="form_data.new_fechaexpiracioncedula" 
    :disabled="this.$store.state.loading" 
    required
>
```
### Ejemplo: textarea
```
<textarea type="textarea"
    class="form-control"
    entity="lead"
    name="new_informe_perfil_inversionista" 
    id="new_informe_perfil_inversionista"
    v-model="form_data.new_informe_perfil_inversionista"
    rows="5"
    :disabled="this.$store.state.loading" 
    required
></textarea>
```
### Ejemplo: checkbox
```
<label class="btn btn-block btn-secondary r-3 text-left">
    <input type="checkbox"
        entity="lead"
        id="new_odata_seguridad" 
        name="new_odata_seguridad" 
        :class="errorClass('new_odata_seguridad')" 
        v-model="form_data.new_odata_seguridad" 
        :disabled="this.$store.state.loading"
    >Cuotas de Fondos de Inversión
</label>
```
### Ejemplo: Input de tipo texto con atributo ignore
```
<input type="text" ignore
    class="form-control form-control-lg"
    entity="lead"
    name="telephone2"
    id="telephone2"
    v-model="form_data.telephone2"
    :class="errorClass('telephone2')"
    
    :disabled="this.$store.state.loading"
    :placeholder="this.$store.state.loading ? 'Cargando ...' : ''"
>
```

### Ejemplo: Radio button
```
<div class="form-group">
    <label class="btn btn-block btn-secondary r-3 text-left">
        <input type="radio"
            entity="lead"
            id="new_odata_rentabilidad"
            name="objetivos_inversion"
            :class="errorClass('objetivos_inversion')"
            :disabled="this.$store.state.loading"
            v-model="form_radio.new_odata_rentabilidad"
            value="new_odata_rentabilidad"
        >
        <strong>Rentabilidad</strong>: Persigo el mayor rendimiento posible asumiendo los riesgos que sean necesarios.
    </label>
</div>
<div class="form-group">
    <label class="btn btn-block btn-secondary r-3 text-left">
        <input type="radio"
            entity="lead"
            id="new_odata_apreciaciondecapital"
            name="objetivos_inversion"
            :class="errorClass('objetivos_inversion')"
            :disabled="this.$store.state.loading"
            v-model="form_radio.new_odata_apreciaciondecapital"
            value="new_odata_apreciaciondecapital"
        >
        <strong>Apreciación de Capital</strong>: Persigo obtener aumentar mis ganancias asumiendo riesgos moderados.
    </label>
</div>
```
\^.^ ... fin