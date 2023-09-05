import * as fs from 'fs';

export interface GraviteeioVersion {
  version: {
    full?: string;
    major?: string;
    minor?: string;
    patch?: string;
  };
  qualifier: {
    full?: string;
    name?: string;
    version?: string;
  };
}

export function parse(graviteeioVersion: string): GraviteeioVersion {
  const [versionFull, qualifierFull] = graviteeioVersion.split('-');

  const [major, minor, patch] = versionFull.split('.');
  const [name, qualifierVersion] = qualifierFull?.split('.') ?? ['', ''];

  return {
    version: {
      full: versionFull,
      major,
      minor,
      patch,
    },
    qualifier: {
      full: qualifierFull ?? '',
      name,
      version: qualifierVersion,
    },
  };
}

export function computeApimVersion(pomXmlPath = '~/projects/gravitee-api-management/pom.xml'): string {
  const pomXml = fs.readFileSync(pomXmlPath, 'utf8');
  const { revision, sha1, changelist } = parsePomXml(pomXml);
  return `${revision}${sha1}${changelist}`;
}

function parsePomXml(pomXml: string) {
  const revisionMatch = pomXml.match(/<revision>(.*?)<\/revision>/);
  const sha1Match = pomXml.match(/<sha1>(.*?)<\/sha1>/);
  const changelistMatch = pomXml.match(/<changelist>(.*?)<\/changelist>/);

  return {
    revision: revisionMatch && revisionMatch.length > 0 ? revisionMatch[1] : '',
    sha1: sha1Match && sha1Match.length > 0 ? sha1Match[1] : '',
    changelist: changelistMatch && changelistMatch.length > 0 ? changelistMatch[1] : '',
  };
}
