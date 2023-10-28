const actFrame = top.frames['d_act']
const MAX_NUM_OF_ATTEMPTS = 5
let rects;
let results;
let unreliableResults;
let worker = null;

function findBy(frame, byType, typeName, byAttribute, attributeName) {
    let elements;
    switch (byType) {
        case("tag"):
            elements = frame.document.getElementsByTagName(typeName);
            break;

        case("class"):
            elements = frame.document.getElementsByClassName(typeName);
            break;

        case("id"):
            return frame.document.getElementById(typeName);
        default:
            return;
    }
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        switch (byAttribute) {
            case "innerText":
                if (element.innerText.includes(attributeName)) {
                    return element
                }
                break;
            case "value":
                if (element.value.includes(attributeName)) {
                    return element
                }
                break;
            case "title":
                if (element.title.includes(attributeName)) {
                    return element
                }
            case "name":
                if (element.name.includes(attributeName)) {
                    return element
                }
                break;
            default:
                return;
        }
    }
}

function fillTransparentAsWhite(ctx, fromX, fromY, width, height) {
    let imageData = ctx.getImageData(fromX, fromY, width, height);
    let data = imageData.data;

    // Пройдите по каждому пикселю и сделайте изображение черно-белым
    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] != 255) {
            data[i] = 255
            data[i + 1] = 255
            data[i + 2] = 255
            data[i + 3] = 255
        }
    }

    // Примените изменения на canvas
    ctx.putImageData(imageData, fromX, fromY);
}

function greyScaleOriginal(ctx, threshold, width, height) {
    let imageData = ctx.getImageData(0, 0, width, height);
    let data = imageData.data;

    // Пройдите по каждому пикселю и сделайте изображение черно-белым
    for (let i = 0; i < data.length; i += 4) {
        let grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = grayscale > threshold ? 255 : 0;     // красный
        data[i + 1] = grayscale > threshold ? 255 : 0; // зеленый
        data[i + 2] = grayscale > threshold ? 255 : 0; // синий
    }

    // Примените изменения на canvas
    ctx.putImageData(imageData, 0, 0);
}

function rotateCanvasRegion(canvas, xFrom, yFrom, width, height, angleInDegrees) {
    const ctx = canvas.getContext('2d');
    // Создать временный канвас и контекст
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    // Установить размер временного канваса
    tempCanvas.width = width;
    tempCanvas.height = height;

    // Отрисовать область, которую нужно повернуть, на временном канвасе
    tempCtx.drawImage(ctx.canvas, xFrom, yFrom, width, height, 0, 0, width, height);

    // Очистить исходный канвас в области, которую нужно повернуть
    ctx.clearRect(xFrom, yFrom, width, height);

    // Сохранить текущее состояние контекста
    ctx.save();

    // Переместить контекст к точке, вокруг которой нужно повернуть
    ctx.translate(xFrom + width / 2, yFrom + height / 2);

    // Перевести угол в радианы
    const angleInRadians = (angleInDegrees * Math.PI) / 180;

    // Повернуть контекст на указанный угол
    ctx.rotate(angleInRadians);

    // Вернуть контекст к исходной точке
    ctx.translate(-(xFrom + width / 2), -(yFrom + height / 2));

    // Нарисовать повернутую область на исходном канвасе
    ctx.drawImage(tempCanvas, 0, 0, width, height, xFrom, yFrom, width, height);

    // Восстановить исходное состояние контекста
    ctx.restore();
}

function greyScale(ctx, threshold, xFrom, yFrom, width, height) {
    let imageData = ctx.getImageData(xFrom, yFrom, width, height);
    let data = imageData.data;

    // Пройдите по каждому пикселю и сделайте изображение черно-белым
    for (let i = 0; i < data.length; i += 4) {
        let grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (Math.abs(grayscale - data[i]) > threshold ||
            Math.abs(grayscale - data[i + 1]) > threshold ||
            Math.abs(grayscale - data[i + 2]) > threshold) {
            data[i] = 0;     // красный
            data[i + 1] = 0; // зеленый
            data[i + 2] = 0; // синий
        } else {
            data[i] = 255
            data[i + 1] = 255
            data[i + 2] = 255
        }
    }

    // Примените изменения на canvas
    ctx.putImageData(imageData, xFrom, yFrom);
}

function adjustContrast(ctx, contrastFactor, fromX, fromY, width, height) {
    const imageData = ctx.getImageData(fromX, fromY, width, height);
    const data = imageData.data;

    // Применяем операцию преобразования контрастности к каждому пикселю
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i] / 255; // Красный канал (в диапазоне 0-1)
        const g = data[i + 1] / 255; // Зеленый канал (в диапазоне 0-1)
        const b = data[i + 2] / 255; // Синий канал (в диапазоне 0-1)

        // Применяем операцию контрастности к каждому цветовому каналу
        const newR = ((r - 0.5) * contrastFactor + 0.5) * 255;
        const newG = ((g - 0.5) * contrastFactor + 0.5) * 255;
        const newB = ((b - 0.5) * contrastFactor + 0.5) * 255;

        // Ограничиваем значения в диапазоне 0-255
        data[i] = Math.min(255, Math.max(0, newR));
        data[i + 1] = Math.min(255, Math.max(0, newG));
        data[i + 2] = Math.min(255, Math.max(0, newB));
    }
    ctx.putImageData(imageData, fromX, fromY);
}

function getRectangles(ctx, width, height, margin) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    let leftBounds = []
    let rightBounds = []

    let isWhite = true;
    for (let x = 0; x < width; x++) {
        let lineBlack = false;
        for (let y = 0; y < height; y++) {
            const r = data[(y * width + x) * 4]; // Красный канал (в диапазоне 0-1)
            const g = data[(y * width + x) * 4 + 1]; // Зеленый канал (в диапазоне 0-1)
            const b = data[(y * width + x) * 4 + 2]; // Синий канал (в диапазоне 0-1)
            if ((r + g + b) < 700) lineBlack = true;
        }
        if (lineBlack && isWhite) {
            isWhite = false
            leftBounds.push(x)
        }
        if (!lineBlack && !isWhite) {
            isWhite = true
            rightBounds.push(x)
        }
    }
    let results = []
    for (let i = 0; i < leftBounds.length; i++) {
        let isWhite = true;
        let topBound = 0;
        let bottomBound = height - 1;
        for (let y = 0; y < height; y++) {
            let lineBlack = false;
            let nextlinesBlack = false
            for (let x = leftBounds[i]; x < rightBounds[i]; x++) {
                const r = data[(y * width + x) * 4]; // Красный канал (в диапазоне 0-1)
                const g = data[(y * width + x) * 4 + 1]; // Зеленый канал (в диапазоне 0-1)
                const b = data[(y * width + x) * 4 + 2]; // Синий канал (в диапазоне 0-1)
                if ((r + g + b) < 700) lineBlack = true;
            }
            if (lineBlack && isWhite) {
                isWhite = false
                if (!topBound) {
                    topBound = y
                }
            }
            if (!lineBlack && !isWhite) {
                isWhite = true
                bottomBound = y
            }
        }
        if (bottomBound && bottomBound - topBound + 2 > 6) {
            const left = (leftBounds[i] - margin) >= 0 ? leftBounds[i] - margin : 0
            const top = (topBound - margin) >= 0 ? topBound - margin : 0
            const right = (rightBounds[i] + margin) <= width ? rightBounds[i] + margin : width
            const bottom = (bottomBound + margin) <= height ? bottomBound + margin : height
            results.push({
                left: left,
                top: top,
                width: right - left,
                height: bottom - top
            })

        }
    }
    return results
}

function createOrUpdateGreyScaleCanvas(width, height) {
    let canvas = findOrCreateCanvas("greyScaleCanvas")
    canvas.width = width;
    canvas.height = height;
    return canvas
}

function createOrUpdateOriginalCanvas(width, height) {
    let canvas = findOrCreateCanvas("originalCanvas")
    canvas.width = width;
    canvas.height = height;
    canvas.style.display = "none"
    return canvas
}

function createOrUpdateOriginalRotatedCanvas(width, height) {
    let canvas = findOrCreateCanvas("originalRotatedCanvas")
    canvas.width = width;
    canvas.height = height;
    canvas.style.display = "none"
    return canvas
}

function findCanvas(id) {
    return actFrame.document.getElementById(id)
}

function findOrCreateCanvas(id, width, height) {
    let currentCanvas = findCanvas(id)
    if (currentCanvas) {
        if (height !== undefined && width !== undefined) {
            currentCanvas.width = width
            currentCanvas.height = height
        }
        return currentCanvas
    } else {
        const canvas = actFrame.document.createElement('canvas');
        if (height !== undefined && width !== undefined) {
            canvas.width = width
            canvas.height = height
        }
        canvas.id = id
        return canvas
    }
}

async function recognizeTextFromBlob(blob, rects) {
    // console.log(rects)
    const values = [];
    const currentWorker = await Tesseract.createWorker();
    await currentWorker.loadLanguage('eng');
    await currentWorker.initialize('eng', Tesseract.OEM.TESSERACT_LSTM_COMBINED);
    await currentWorker.setParameters({
        tessedit_pageseg_mode: Tesseract.PSM.SINGLE_CHAR,
        tessedit_char_whitelist: '0123456789abcdefghjk'
    });

    for (let i = 0; i < rects.length; i++) {
        const r = await currentWorker.recognize(blob, {rectangle: rects[i]});
        values.push({
            position: rects[i].position,
            index: i,
            text: r.data.text.trim(),
            confidence: r.data.confidence,
            confidence2: r.data.symbols && r.data.symbols.length == 1 ? r.data.symbols[0].confidence : 0

        });
        // console.log(i + " = " + r.data.confidence + "%")
        // console.log(r)
    }
    await currentWorker.terminate()
    // console.log(values)
    return values
}

function loadTesseract() {
    return new Promise((resolve, reject) => {
        if (typeof Tesseract === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        } else {
            resolve();
        }
    });
}

async function loadOpencv() {
    return new Promise((resolve, reject) => {
        if (typeof cv === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://docs.opencv.org/master/opencv.js';
            script.onload = () => {
                script.onload = null; // Убираем обработчик, чтобы избежать повторного вызова
                // Добавьте обработчик onRuntimeInitialized для определения, что OpenCV полностью загружен.
                cv.onRuntimeInitialized = () => {
                    console.log("OpenCV загружен");
                    resolve();
                };
            };
            script.onerror = reject;
            document.body.appendChild(script);
        } else {
            console.log("already loaded")
            resolve();
        }
    });
}

async function runRecognition(canvas, rects) {
    // return [];

    return new Promise((resolve) => {
        canvas.toBlob(async (blob) => {
            const result = await recognizeTextFromBlob(blob, rects);
            resolve(result);
        }, 'image/jpeg');
    });
}

function mapValue(number, inMin, inMax, outMin, outMax) {
    // Масштабирование числа из одного диапазона в другой
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

async function prepareAndRunImages(attempt) {
    removeByTag(actFrame, "canvas", ["originalCanvas", "originalRotatedCanvas"])

    // const rects = [rect]
    const promises = rects.map(async (rect) => {

        const THRESHOLD_FROM = mapValue(attempt, 1, MAX_NUM_OF_ATTEMPTS,5,15)
        const THRESHOLD_TO = mapValue(attempt, 1, MAX_NUM_OF_ATTEMPTS,80,120)
        const THRESHOLD_STEP = attempt > 2 ? 1 : 2
        const EXPECTED_HEIGHT = 25
        const NEEDED_NUM_OF_ITEMS = Math.min(20 * attempt, 50)
        const scaleFactor = Math.ceil(EXPECTED_HEIGHT / rect.height)
        const contrastFactor = Math.random() + 3
        const PERCENTAGE_BLACK_FROM = mapValue(attempt, 1, MAX_NUM_OF_ATTEMPTS,10,5)
        const PERCENTAGE_BLACK_TO = mapValue(attempt, 1, MAX_NUM_OF_ATTEMPTS,40,60)
        const USE_ISLANDS = attempt % 2 != 0
        const result = copyFromOriginalTo(rect,
            THRESHOLD_FROM, THRESHOLD_TO, THRESHOLD_STEP,
            scaleFactor,
            NEEDED_NUM_OF_ITEMS,
            contrastFactor,
            PERCENTAGE_BLACK_FROM,
            PERCENTAGE_BLACK_TO,
            USE_ISLANDS
        )

        // console.log(result.workingCanvas)
        // console.log(result.rects)
        return runRecognition(result.workingCanvas, result.rects)
    })

    const values = await Promise.all(promises)
    console.log(values)

    return processResults(values)
}

async function run(attempt) {
    if (attempt <= MAX_NUM_OF_ATTEMPTS) {
        console.log("ATTEMPT = " + attempt)
        const tempRes = await prepareAndRunImages(attempt)
        let rectsToRecognize = []

        for (let i = 0; i < tempRes.length; i++) {
            if (tempRes[i].confidence >= 95) {
                results[tempRes[i].position] = tempRes[i]
                if(unreliableResults[tempRes[i].position] != null) {
                    unreliableResults[tempRes[i].position] = null
                }
            } else {
                if(unreliableResults[tempRes[i].position] == null ||
                    unreliableResults[tempRes[i].position] != null &&
                    unreliableResults[tempRes[i].position].confidence < tempRes[i].confidence) {
                    unreliableResults[tempRes[i].position] = tempRes[i]
                }

                rectsToRecognize.push(rects[i])
            }
        }
        if (rectsToRecognize.length != 0) {
            rects = rectsToRecognize
            await run(++attempt)
        }
    }
}

async function createWorker(){
    // Создаем и инициализируем воркер
    if(worker == null) {
        const currentWorker = await Tesseract.createWorker();
        await currentWorker.loadLanguage('eng');
        await currentWorker.initialize('eng', Tesseract.OEM.TESSERACT_LSTM_COMBINED);
        await currentWorker.setParameters({
            tessedit_pageseg_mode: Tesseract.PSM.SINGLE_CHAR,
            tessedit_char_whitelist: '0123456789abcdefghjk'
        });
        worker = currentWorker
    }
}
async function removeWorker(){
    // Создаем и инициализируем воркер
    if(worker != null) {
        // Завершение всех воркеров
        await worker.terminate();
        worker = null
    }
}

async function renameLater() {

    await loadOpencv()
    await loadTesseract();
    rects = new Array(4)
    results = new Array(4).fill(null);
    unreliableResults = new Array(4).fill(null);

    console.log("loaded")
    // const a = new cv.Mat()
    const cImg = findBy(actFrame, "tag", "img", "title", "Введите символы")
    const originalRotatedCanvas = copyImgToCanvas(cImg)
    rects = findRectanglesAndAngle(cImg)
    rects.forEach((item, index) => {
        item.position = index
        rotateCanvasRegion(originalRotatedCanvas, item.left, item.top, item.width, item.height, item.angle)
    })

    // console.log(rects)

    // await createWorker()
    await run(1)
    // await removeWorker()
    if(unreliableResults.every(element => element == null)) {
        console.log("can rely")
    } else {
        console.log("can't rely:")
        console.log(unreliableResults);
    }
    console.log(results);

    let code = results.map((result, index) => {
        if (result != null) {
            return result.char;
        } else {
            if(unreliableResults[index] != null) {
                return unreliableResults[index].char
            } else {
                return;
            }
        }
    }).join('');

    findBy(actFrame, "tag", "input", "name", "code").value = code
}

function removeByTag(frame, tag, exclusiveId) {
    const elements = frame.document.getElementsByTagName(tag)
    for (let i = 0; i < elements.length; i++) {
        if (!exclusiveId.includes(elements[i].id)) {
            elements[i].remove()
        }
    }
    if (frame.document.getElementsByTagName(tag).length <= exclusiveId.length) {
        return
    } else {
        removeByTag(frame, tag, exclusiveId)
    }
}

function processResults(results) {

    const mostProbableCharacters = results.map((subArray) => {
        const characterFrequency = {};
        let maxWeightedScore = -Infinity;
        let mostProbableChar = null;
        let maxConfidence = 0;
        let pos;

        for (const item of subArray) {
            const char = item.text;
            const confidence2 = item.confidence2; // Вероятность символа
            if (confidence2 >= 99.2) {
                return {char: char, confidence: confidence2, position: item.position};
            }
            if (confidence2 < 80) {
                continue;
            }
            if (characterFrequency[char]) {
                characterFrequency[char].count += 1;
                characterFrequency[char].weightedScore += confidence2;
                characterFrequency[char].maxConfidence = confidence2;
            } else {
                characterFrequency[char] = {
                    count: 1,
                    weightedScore: confidence2,
                    maxConfidence: 0,
                };
            }
            pos = item.position;


            // Вес символа = частота * вероятность
            const weightedScore = characterFrequency[char].count * characterFrequency[char].weightedScore;

            if (weightedScore > maxWeightedScore) {
                maxWeightedScore = weightedScore;
                mostProbableChar = char;
                maxConfidence = characterFrequency[char].maxConfidence
            }
        }
        if(mostProbableChar == null) {
            for (const item of subArray) {
                const char = item.text;
                const confidence2 = item.confidence2; // Вероятность символа
                if (characterFrequency[char]) {
                    characterFrequency[char].count += 1;
                    characterFrequency[char].weightedScore += confidence2;
                    characterFrequency[char].maxConfidence = confidence2;
                } else {
                    characterFrequency[char] = {
                        count: 1,
                        weightedScore: confidence2,
                        maxConfidence: 0,
                    };
                }
                pos = item.position;

                // Вес символа = частота * вероятность
                const weightedScore = characterFrequency[char].count * characterFrequency[char].weightedScore;

                if (weightedScore > maxWeightedScore) {
                    maxWeightedScore = weightedScore;
                    mostProbableChar = char;
                    maxConfidence = characterFrequency[char].maxConfidence
                }
            }
        }

        return {char: mostProbableChar, confidence: maxConfidence, position: pos};
    });

    console.log(mostProbableCharacters);
    return mostProbableCharacters
}

function copyImgToCanvas(img) {
    const width = img.width
    const height = img.height
    const canvas = createOrUpdateOriginalCanvas(width, height)
    const rotatedCanvas = createOrUpdateOriginalRotatedCanvas(width, height)

    const parentElement = img.parentElement;
    parentElement.insertBefore(canvas, img);
    parentElement.insertBefore(rotatedCanvas, img);


    const ctx = canvas.getContext('2d');
    const rotatedCtx = rotatedCanvas.getContext('2d');
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(img, 0, 0, width, height);
    rotatedCtx.clearRect(0, 0, width, height)
    rotatedCtx.drawImage(img, 0, 0, width, height);
    return rotatedCanvas
}

function findRectanglesAndAngle(img) {
    const width = img.width
    const height = img.height
    const canvas = createOrUpdateGreyScaleCanvas(width, height)

    // const parentElement = img.parentElement;
    // parentElement.insertBefore(canvas, img);


    const ctx = canvas.getContext('2d', {willReadFrequently: true});
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(img, 0, 0, width, height);


    adjustContrast(ctx, 6, 0, 0, width, height)
    greyScaleOriginal(ctx, 240, width, height)

    const rectangles = getRectangles(ctx, width, height, 2)
    rectangles.forEach((item) =>
        item.angle = calculateSymbolAngle(canvas, item, 5)
    )

    return rectangles
}

function copyFromOriginalTo(rect,
                            thresholdFrom, thresholdTo, thresholdStep,
                            scaleFactor,
                            neededNumOfItems,
                            contrastFactor,
                            percentageFrom,
                            percentageTo,
                            USE_ISLANDS) {
    const originalCanvas = findCanvas("originalCanvas")
    const originalRotatedCanvas = findCanvas("originalRotatedCanvas")
    const singleItemWidth = rect.width * scaleFactor
    const singleItemHeight = rect.height * scaleFactor
    const width = singleItemWidth * Math.round((thresholdTo - thresholdFrom + 1) / thresholdStep)
    const height = singleItemHeight * 2
    const canvas = findOrCreateCanvas("temp-" + (Math.random() + '').slice(2), width, height)
    const tempRects = []

    const ctx = canvas.getContext('2d', {willReadFrequently: true});
    // ctx.clearRect(0, 0, width, height)

    let totalFirstLineWidth = 0;
    let totalHeight = 0;
    let numOfItems = 0;
    thresholdStep = Math.max(Math.ceil((thresholdTo - thresholdFrom) / neededNumOfItems), thresholdStep)

    for (let threshold = thresholdFrom; threshold < thresholdTo && numOfItems < neededNumOfItems; threshold += thresholdStep) {
        ctx.drawImage(originalCanvas, rect.left, rect.top, rect.width, rect.height, totalFirstLineWidth, totalHeight, singleItemWidth, singleItemHeight);
        adjustContrast(ctx, contrastFactor, totalFirstLineWidth, totalHeight, singleItemWidth, singleItemHeight)
        greyScale(ctx, threshold, totalFirstLineWidth, totalHeight, singleItemWidth, singleItemHeight)
        fillTransparentAsWhite(ctx, totalFirstLineWidth, totalHeight, singleItemWidth, singleItemHeight)

        const islands = evaluateIslands(ctx, totalFirstLineWidth, totalHeight, singleItemWidth, singleItemHeight)
        const percentage = evaluatePercentageOfBlack(ctx, totalFirstLineWidth, totalHeight, singleItemWidth, singleItemHeight)
        // console.log("treshold = " + threshold + ", percentage = " + percentage + "%, islands = " + islands)
        // console.log(rect.position + " not added, " + percentage + "%, islands = " + islands)
        if (percentage > percentageFrom && percentage < percentageTo && (!USE_ISLANDS || islands)) {
            tempRects.push({
                position: rect.position,
                left: totalFirstLineWidth,
                top: totalHeight,
                width: singleItemWidth,
                height: singleItemHeight
            })
            totalFirstLineWidth += singleItemWidth
            // console.log(percentage)
            numOfItems++
        } else {
            ctx.clearRect(totalFirstLineWidth, singleItemHeight, singleItemWidth, singleItemHeight)
        }
    }
    if (numOfItems != 0) {
        totalHeight += singleItemHeight
        numOfItems = 0;
    }
    let totalSecondLineWidth = 0;

    for (let threshold = thresholdFrom; threshold < thresholdTo && numOfItems < neededNumOfItems; threshold += thresholdStep) {
        ctx.drawImage(originalRotatedCanvas, rect.left, rect.top, rect.width, rect.height, totalSecondLineWidth, totalHeight, singleItemWidth, singleItemHeight);
        adjustContrast(ctx, contrastFactor, totalSecondLineWidth, totalHeight, singleItemWidth, singleItemHeight)
        greyScale(ctx, threshold, totalSecondLineWidth, totalHeight, singleItemWidth, singleItemHeight)
        fillTransparentAsWhite(ctx, totalSecondLineWidth, totalHeight, singleItemWidth, singleItemHeight)

        const islands = evaluateIslands(ctx, totalSecondLineWidth, totalHeight, singleItemWidth, singleItemHeight)
        const percentage = evaluatePercentageOfBlack(ctx, totalSecondLineWidth, totalHeight, singleItemWidth, singleItemHeight)
        // console.log("treshold = " + threshold + ", percentage = " + percentage + "%, islands = " + islands)
        // console.log(rect.position + " not added, " + percentage + "%, islands = " + islands)
        if (percentage > percentageFrom && percentage < percentageTo && (!USE_ISLANDS || islands)) {
            tempRects.push({
                position: rect.position,
                left: totalSecondLineWidth,
                top: totalHeight,
                width: singleItemWidth,
                height: singleItemHeight
            })
            totalSecondLineWidth += singleItemWidth
            // console.log(percentage)
            numOfItems++
        } else {
            ctx.clearRect(totalSecondLineWidth, singleItemHeight, singleItemWidth, singleItemHeight)
        }
    }

    if (numOfItems != 0) {
        totalHeight += singleItemHeight
    }

    const totalWidth = Math.max(totalFirstLineWidth, totalSecondLineWidth)
    const canvas2 = findOrCreateCanvas("temp-" + (Math.random() + '').slice(2), totalWidth, totalHeight)
    const ctx2 = canvas2.getContext('2d');
    // fillTransparentAsWhite(ctx2, 0, 0, totalWidth, totalHeight)

    ctx2.drawImage(canvas, 0, 0, totalWidth, totalHeight, 0, 0, totalWidth, totalHeight)

    // const img = findBy(actFrame, "tag", "img", "title", "Введите символы")
    // const parentElement = img.parentElement;
    // parentElement.insertBefore(canvas2, img);
    canvas.remove()

    return {workingCanvas: canvas2, rects: tempRects}
}

function evaluatePercentageOfBlack(ctx, xFrom, yFrom, width, height) {
    let imageData = ctx.getImageData(xFrom, yFrom, width, height);
    let data = imageData.data;
    let blackPixels = 0;

    // Пройдите по каждому пикселю и сделайте изображение черно-белым
    for (let i = 0; i < data.length; i += 4) {
        if (data[i] == 0) {
            blackPixels++;
        }
    }
    const percent = blackPixels / (data.length / 4)
    return Math.round(percent * 1000) / 10
}

function evaluateIslands(ctx, xFrom, yFrom, width, height) {

    var canvasImageData = ctx.getImageData(xFrom, yFrom, width, height);
    var data = new Uint8Array(canvasImageData.data.buffer);
    // Создание Mat (матрицы) изображения с использованием opencv.js
    var src = new cv.Mat(height, width, cv.CV_8UC4);
    src.data.set(data);
    // showOnCanvas(src, width, height)

    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
    cv.bitwise_not(src, src);

    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(src, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

    const contoursCount = contours.size()
    const result = (contoursCount == 1 || contoursCount == 2) && analyzeContours(contours, hierarchy)
    // if (result) {
    //     console.log("ccc= " + contoursCount, "analyze = " + analyzeContours(contours, hierarchy))
    // }

    src.delete()
    hierarchy.delete()
    contours.delete()
    return result;
}

function analyzeContours(contours, hierarchy) {
    let externalContours = 0;
    let externalWithoutInternalContours = 0;

    for (let i = 0; i < contours.size(); i++) {
        // Проверяем, что hierarchy[0][i] и hierarchy[2][i] существуют
        const hierarchyData = hierarchy.intPtr(i);

        // console.log(hierarchyData)
        const parent = hierarchyData[3]; // Индекс родительского контура
        const child = hierarchyData[2];  // Индекс первого дочернего контура
        const prevNeighbor = hierarchyData[0];  // Индекс предыдущего соседнего контура
        const nextNeighbor = hierarchyData[1];  // Индекс следующего соседнего контура

        // Проверяем, является ли текущий контур внешним (без родительского контура)
        if (parent === -1) {
            externalContours++;

            // Проверяем, есть ли у текущего внешнего контура внутренние контуры
            if (child === -1) {
                externalWithoutInternalContours++;
            }
        }
    }

    // Возвращаем true, если на изображении только один внешний контур
    // или два внешних, но один из них не имеет внутренних контуров
    return externalWithoutInternalContours === 1 ||
        externalContours === 1 ||
        (externalContours === 2 && externalWithoutInternalContours === 2)
}

function calculateSymbolAngle(originalGreyScaleCanvas, rect, scaleFactor) {
    const width = rect.width * scaleFactor
    let height = rect.height * scaleFactor
    const canvas = findOrCreateCanvas("temp-" + (Math.random() + '').slice(2), width, height)

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(originalGreyScaleCanvas, rect.left, rect.top, rect.width, rect.height, 0, 0, width, height);

    // Получение изображения с Canvas
    var canvasImageData = ctx.getImageData(0, 0, width, height);
    var data = new Uint8Array(canvasImageData.data.buffer);
    var src = new cv.Mat(height, width, cv.CV_8UC4);
    src.data.set(data);
    // showOnCanvas(src, width, height)


    // Преобразование изображения в оттенки серого
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, cv.CV_8UC1);
    // showOnCanvas(src, width, height)

    var edges = new cv.Mat();
    cv.Canny(src, edges, 45, 100, cv.BORDER_WRAP);
    // showOnCanvas(edges, width, height)


    const angles = []
    for (let angle = 35; angle >= -35; angle -= 2) {

        // Центр вращения (в данном случае, центр изображения)
        var center = new cv.Point(width / 2, height / 2);
        var rotationMatrix = cv.getRotationMatrix2D(center, angle, 1);

        // Примените матрицу преобразования к изображению
        var rotatedMat = new cv.Mat();
        cv.warpAffine(edges, rotatedMat, rotationMatrix, new cv.Size(width, height));
        // if(angle == 0) {
        //      showOnCanvas(rotatedMat, width, height)
        // }

        const size = calculateSymbolSize(rotatedMat, angle)
        angles.push({width: size.width, height: size.height, angle: angle})

        rotatedMat.delete()
    }
    // console.log(angles)
    let minWidth = Number.MAX_VALUE;
    const arr = [];

    angles.forEach((item) => {
        if (item.width < minWidth) {
            minWidth = item.width;
            arr.length = 0;
        }
        if (item.width === minWidth) {
            arr.push(item.angle);
        }
    });

    const middleIndex = Math.floor(arr.length / 2);
    const middleItem = arr[middleIndex];

    // Освобождение ресурсов
    src.delete();
    edges.delete();
    return -middleItem;
}

function calculateSymbolSize(mat, angle) {
    // Создайте массив для хранения суммы черных пикселей в каждой колонке
    const blackPixels = new Array(mat.cols).fill(0);

    // Подсчитайте количество черных пикселей для каждой колонки
    for (let x = 0; x < mat.cols; x++) {
        let isAllBlack = true
        for (let y = 0; y < mat.rows; y++) {
            if (mat.ucharAt(y, x) !== 0) { // 0 представляет черный цвет

                isAllBlack = false
            }
            if(angle == 0) {
                console.log(mat.ucharAt(y, x))
            }
        }
        if (isAllBlack) blackPixels[x] = 1
    }


    let left = 0
    let right = mat.cols
    let found = false
    for (let x = 0; x < mat.cols && !found; x++) {
        if (blackPixels[x] == 1) {
            continue
        } else {
            left = x
            found = true
        }
    }
    found = false

    for (let x = mat.cols; x >= 0 && !found; x--) {
        if (blackPixels[x] == 0) {
            continue
        } else {
            right = x
            found = true
        }
    }
    const width = right - left

    // Создайте массив для хранения суммы черных пикселей в каждой колонке
    const blackPixelsForHeight = new Array(mat.rows).fill(0);

    // Подсчитайте количество черных пикселей для каждой колонки
    for (let y = 0; y < mat.rows; y++) {
        let isAllBlack = true
        for (let x = 0; x < mat.cols; x++) {
            if (mat.ucharAt(y, x) !== 0) { // 0 представляет черный цвет
                isAllBlack = false
            }
        }
        if (isAllBlack) blackPixelsForHeight[y] = 1
    }


    let top = 0
    let bottom = mat.rows

    found = false
    for (let y = 0; y < mat.rows && !found; y++) {
        if (blackPixelsForHeight[y] == 1) {
            continue
        } else {
            top = y
            found = true
        }
    }
    found = false

    for (let y = mat.rows; y >= 0 && !found; y--) {
        if (blackPixelsForHeight[y] == 0) {
            continue
        } else {
            bottom = y
            found = true
        }
    }
    const height = bottom - top

    return {width: width, height: height}; // Ширина символа
}

function showOnCanvas(smth, width, height) {
    const img = findBy(actFrame, "tag", "img", "title", "Введите символы")

    var canvas = document.createElement('canvas');
    canvas.height = height
    canvas.width = width
    canvas.id = "temp-" + Math.random()
    var ctx = canvas.getContext('2d');

    const parentElement = img.parentElement;
    parentElement.insertBefore(canvas, img);

    cv.imshow(canvas, smth);
    return canvas
}

renameLater()
