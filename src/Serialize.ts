import {URIComponents} from "./index";

export function serialize(components: URIComponents): string {
    let buildResult = buildStartUrl(components);
    let urlBuilder;
    try {
        urlBuilder = new URL(buildResult.startUrl);
    } catch (error: any) {
        if (error.message) {
            console.error(error.message + ' ' + buildResult.startUrl);
        }
        return '';
    }
    if (components.scheme !== undefined && !buildResult.temporarySchemeAndHostUsed && !buildResult.temporarySchemeUsed) {
        urlBuilder.protocol = components.scheme.toLowerCase();
    } else {
        components.scheme = '';
    }
    if (components.host !== undefined && !buildResult.temporarySchemeAndHostUsed) {
        urlBuilder.host = components.host;
    } else {
        urlBuilder.host = '';
    }
    if (components.port) {
        urlBuilder.port = String(components.port);
    }
    if (components.path) {
        urlBuilder.pathname = components.path;
    } else {
        urlBuilder.pathname = '';
    }
    if (components.userinfo) {
        let parts = components.userinfo.split(':');
        if (parts[0]) {
            urlBuilder.username = parts[0];
        }
        if (parts[1]) {
            urlBuilder.password = parts[1];
        }
    }
    if (components.query) {
        urlBuilder.search = components.query;
    }
    if (components.fragment) {
        urlBuilder.hash = components.fragment;
    }
    let result = urlBuilder.toString();
    if (!components.path && result.endsWith('/')) {
        result = result.slice(0, -1);
    }
    if (buildResult.temporarySchemeAndHostUsed) {
        result = result.replace(temporarySchemeAndHost, '');
        if (result.startsWith('/')) {
            result = result.slice(1);
        }
    }
    if (buildResult.temporarySchemeUsed) {
        result = result.replace(temporaryScheme, '');
    }
    if (!result.match(/[^\/]/)) { // only "//" left
        return '';
    }
    return result;
}

const temporarySchemeAndHost = 'https://_remove_me_host_';
const temporaryScheme = 'https://';


function buildStartUrl(components: URIComponents) {
    let result: {
        startUrl: string,
        temporarySchemeUsed: boolean,
        temporarySchemeAndHostUsed: boolean
    } = {
        startUrl: '',
        temporarySchemeUsed: false,
        temporarySchemeAndHostUsed: false,
    }
    if (components.scheme && components.host) {
        result.startUrl = components.scheme + '://' + components.host;
        return result;
    }
    if (components.host) {
        result.temporarySchemeUsed = true;
        result.startUrl = temporaryScheme + components.host;
        return result;
    }
    result.temporarySchemeAndHostUsed = true;
    result.startUrl = temporarySchemeAndHost;
    return result;
}
