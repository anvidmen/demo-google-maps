# Respuestas preguntas teóricas

## Problemas detectados

* En el pseudocodigo en `services` se utiliza un metodo de iteracion si en un futuro queremos añadir otro servicio se tendria que modificar el codigo para obtener el precio dentro de un nuevo `else-if`.

* En la clase de `RegisteredUser` en el metodo `getTotal` se esta utilizando una clase que no tiene directamente asociada él `MultimediaContent`, lo cual repercutiria que si se realiza cambios en la logica de `MultimediaContent`, afecte el codigo de `RegisteredUser`.

## Pseudocódigo

``` c
class RegisteredUser  {
    constructor (services = []) {
        this.services = services
    }

    getTotal () {
        let total = 0
        this.services.forEach((service, index) => {
            total += service.getServiceFee()
        })
        return total
    }
}

class Service {
    constructor (content) {
        this.content = content
    }

    getMultimediaContent () {
        return this.content
    }

    getSpecificPrice () {
        throw new Error('You have to implement the method doSomething!')
    }

    getServiceFee () {
        return this.getSpecificPrice() + content.getAdditionalCharges()
    }
}

class StreamingService extends Service {
    getSpecificPrice () {
        return content.streamingPrice
    }
}

class DownloadService extends Service {
    getSpecificPrice () {
        return content.downloadPrice
    }
}

class MultimediaContent {
    constructor (streamingPrice, downloadPrice) {
        this.streamingPrice = streamingPrice
        this.downloadPrice = downloadPrice
    }

    getAdditionalCharges () {
        return 0.0
    }
}

class PremiumContent extends MultimediaContent {
    constructor (streamingPrice, downloadPrice, additionalFee) {
        super(streamingPrice, downloadPrice)
        this.additionalFee = additionalFee
    }

    getAdditionalCharges () {
        return this.additionalFee
    }
}

```
