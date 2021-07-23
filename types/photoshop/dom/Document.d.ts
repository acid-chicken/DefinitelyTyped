import * as Constants from "./Constants";
import Layers from "./collections/Layers";
import HistoryStates from "./collections/HistoryStates";
import HistoryState from "./HistoryState";
import { Bounds } from "./objects/Bounds";
import { JPEGSaveOptions, GIFSaveOptions, PNGSaveOptions, BMPSaveOptions, PhotoshopSaveOptions } from "./Objects";
import { LayerCreateOptions, GroupLayerCreateOptions } from "./objects/CreateOptions";
import Layer from "./Layer";
/** @ignore */
export declare function validateDocument(d: Document): void;
/**
 * @ignore
 */
export declare function PSDocument(id: number): Document;
/**
 * Represents a single Photoshop document that is currently open
 * You can access instances of documents using one of these methods:
 *
 * ```javascript
 * // The currently active document from the Photoshop object
 * const currentDocument = app.activeDocument
 *
 * // Choose one of the open documents from the Photoshop object
 * const secondDocument = app.documents[1]
 *
 * // You can also create an instance of a document via a UXP File entry
 * let fileEntry = require('uxp').storage.localFileSystem.getFileForOpening()
 * const newDocument = await app.open('/project.psd')
 * ```
 */
export default class Document {
    /**
     * The internal ID of this document, valid as long as this document is open
     * Can be used for batchPlay calls to refer to this document, used internally
     */
    get id(): number;
    /**
     * The selected layers in the document
     */
    get activeLayers(): Layers;
    /**
     * The artboards in the document
     */
    get artboards(): Layers;
    /**
     * All the layers in the document at the top level
     */
    get layers(): Layers;
    /**
     * Background layer, if it exists
     */
    get backgroundLayer(): Layer | null;
    /**
     * Full file system path to this document, or the identifier if it is a cloud document
     */
    get path(): string;
    /**
     * History states of the document
     */
    get historyStates(): HistoryStates;
    /**
     * Currently active history state of the document
     */
    get activeHistoryState(): HistoryState;
    /**
     * Selects the given history state to be the active one
     */
    set activeHistoryState(historyState: HistoryState);
    /**
     * The history state that history brush tool will use as its source
     */
    get activeHistoryBrushSource(): HistoryState;
    set activeHistoryBrushSource(historyState: HistoryState);
    /**
     * Document title
     */
    get title(): string;
    /**
     * Document's resolution (in pixels per inch)
     */
    get resolution(): number;
    /**
     * Document's width in pixels
     */
    get width(): number;
    /**
     * Document's height in pixels
     */
    get height(): number;
    /**
     * The (custom) pixel aspect ratio to use
     */
    get pixelAspectRatio(): number;
    set pixelAspectRatio(newValue: number);
    /**
     * @ignore
     */
    constructor(id: number);
    /**
     * Closes the document, showing a prompt to save
     * unsaved changes if specified
     *
     * @param saveOptions By default, prompts a save dialog
     *                    if there are unsaved changes
     *
     * @async
     */
    close(saveDialogOptions?: Constants.SaveOptions): Promise<void>;
    closeWithoutSaving(): void;
    /**
     * Crops the document to given bounds
     * @async
     */
    crop(bounds: Bounds, angle?: number): Promise<void>;
    /**
     * Flatten all layers in the document
     * @async
     */
    flatten(): Promise<void>;
    /**
     * Flattens all visible layers in the document
     * @async
     */
    mergeVisibleLayers(): Promise<void>;
    /**
     * Changes the size of the canvas, but does not change image size
     * To change the image size, see [[resizeImage]]
     *
     *
     * ```javascript
     * // grow the canvas by 400px
     * let width = await document.width
     * let height = await document.height
     * await document.resizeCanvas(width + 400, height + 400)
     * ```
     * @param width Numeric value of new width in pixels
     * @param height Numeric value of new height in pixels
     * @param anchor Anchor point for resizing, by default will resize an equal amount on all sides.
     *
     * @async
     */
    resizeCanvas(width: number, height: number, anchor?: Constants.AnchorPosition): Promise<void>;
    /**
     * Changes the size of the image
     *
     * ```javascript
     * await document.resizeImage(800, 600)
     * ```
     * @param width Numeric value of new width in pixels
     * @param height Numeric value of new height in pixels
     * @param resolution Image resolution in pixels per inch (ppi)
     * @param resampleMethod Method used during image interpolation.
     *
     * @async
     */
    resizeImage(width: number, height: number, resolution?: number, resampleMethod?: Constants.ResampleMethod): Promise<void>;
    /**
     * Rotates the image clockwise in given angle, expanding canvas if necessary
     * @param angle
     *
     * @async
     */
    rotate(angles: number): Promise<void>;
    /**
     * Performs a save of the document. The user will be presented with
     * a Save dialog if the file has yet to be saved on disk.
     *
     * ```javascript
     * // To save a document in the current location
     * document.save()
     *
     * // Shows the save dialog
     * unsavedDocument.save()
     * ```
     *
     * @async
     */
    save(): Promise<void>;
    /**
     * Save the document to a desired file type.
     *
     * For operations that require a UXP File token, use the UXP storage APIs to generate one.
     * See https://www.adobe.com/go/ps-api-uxp-filesystemprovider.
     *
     *
     * ```javascript
     * let entry = await require('uxp').storage.localFileSystem.getFileForSaving("target.psd");
     * document.saveAs.psd(entry);
     *
     * // Save as a Copy (High JPG quality)
     * document.saveAs.jpg(entryJpg, { quality: 12 }, true);
     *
     * // Save a PSB, with some options:
     * document.saveAs.psb(entryPsb, { embedColorProfile: true });
     *
     * ```
     */
    saveAs: {
        /**
         * Save the document as a PSD file.
         * @param entry UXP File token generated from the UXP Storage APIs.
         * @param saveOptions PSD specific save options. See SaveOptions/PhotoshopSaveOptions.
         * @param asCopy Whether to save as a copy.
         */
        psd(entry: File, saveOptions?: PhotoshopSaveOptions, asCopy?: boolean): Promise<void>;
        /**
         * Save the document as a PSB file.
         * @param entry UXP File token generated from the UXP Storage APIs.
         * @param saveOptions PSD/PSB specific save options. See SaveOptions/PhotoshopSaveOptions.
         * @param asCopy Whether to save as a copy.
         */
        psb(entry: File, saveOptions?: PhotoshopSaveOptions, asCopy?: boolean): Promise<void>;
        /**
         * @TODO reenable when we get the green-light to script PSDC
         * Save the document into Cloud Documents (PSDC).
         * @param path String title or path (separated by slash '/') location to save to.
         * @param saveOptions PSD/PSB specific save options. See SaveOptions/PhotoshopSaveOptions.
         */
        /**
         * Save the document as a JPG file.
         * @param entry UXP File token generated from the UXP Storage APIs.
         * @param saveOptions JPEG specific save options. See SaveOptions/JPEGSaveOptions.
         * @param asCopy Whether to save as a copy.
         */
        jpg(entry: File, saveOptions?: JPEGSaveOptions, asCopy?: boolean): Promise<void>;
        /**
         * Save the document as a GIF file.
         * @param entry UXP File token generated from the UXP Storage APIs.
         * @param saveOptions GIF specific save options. See SaveOptions/GIFSaveOptions.
         * @param asCopy Whether to save as a copy.
         */
        gif(entry: File, saveOptions?: GIFSaveOptions, asCopy?: boolean): Promise<void>;
        /**
         * Save the document as a PNG file.
         * @param entry UXP File token generated from the UXP Storage APIs.
         * @param saveOptions PNG specific save options. See SaveOptions/PNGSaveOptions.
         * @param asCopy Whether to save as a copy.
         */
        png(entry: File, saveOptions?: PNGSaveOptions, asCopy?: boolean): Promise<void>;
        /**
         * Save the document as a BMP file.
         * @param entry UXP File token generated from the UXP Storage APIs.
         * @param saveOptions JPEG specific save options. See SaveOptions/BMPSaveOptions.
         * @param asCopy Whether to save as a copy.
         */
        bmp(entry: File, saveOptions?: BMPSaveOptions, asCopy?: boolean): Promise<void>;
    };
    /**
     * Duplicates given layer(s), creating all copies above the top most one in layer stack,
     * and returns the newly created layers.
     * ```javascript
     * // duplicate some layers
     * const layerCopies = await document.duplicateLayers([layer1, layer3])
     * layerCopies.forEach((layer) => { layer.blendMode = 'multiply' })
     * // ...to another document
     * const finalDoc = await photoshop.open('~/path/to/collated/image.psd')
     * await document.duplicateLayers([logo1, textLayer1], finalDoc)
     * await finalDoc.close(SaveOptions.SAVECHANGES)
     * ```
     * @param layers
     * @param targetDocument if specified, duplicate to a different document target.
     *
     * @async
     */
    duplicateLayers(layers: Layer[], targetDocument?: Document): Promise<Layer[]>;
    /**
     * Links layers together if possible, and returns a list of linked layers.
     * @param layers array of layers to link together
     * @returns array of successfully linked layers
     */
    linkLayers(layers: Layer[]): Layer[];
    /**
     * Create a layer. See @CreateOptions
     * ```javascript
     * const myEmptyLayer = await doc.createLayer()
     * const myLayer = await doc.createLayer({ name: "myLayer", opacity: 80, mode: "colorDodge" })
     * ```
     * @async
     */
    createLayer(options?: LayerCreateOptions): Promise<Layer | null>;
    /**
     * Create a layer group. See @CreateOptions
     * ```javascript
     * const myEmptyGroup = await doc.createLayerGroup()
     * const myGroup = await doc.createLayerGroup({ name: "myLayer", opacity: 80, mode: "colorDodge" })
     * const nonEmptyGroup = await doc.createLayerGroup({ name: "group", fromLayers: [layer1, layer2] })
     * ```
     * @async
     */
    createLayerGroup(options?: GroupLayerCreateOptions): Promise<Layer | null>;
    /**
     * Create a layer group from existing layers.
     * ```javascript
     * const layers = doc.layers
     * const group = await doc.groupLayers([layers[1], layers[2], layers[4]])
     * ```
     * @async
     */
    groupLayers(layers: Layer[]): Promise<Layer | null>;
}
