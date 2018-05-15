// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import { DangerDSLType } from '../node_modules/danger/distribution/dsl/DangerDSL';
declare var danger: DangerDSLType;
export declare function warn(message: string, file?: string, line?: number): void;

import { TextLintEngine } from 'textlint';

/**
 * Danger plugin for textlint
 */
module.exports = {
  textlint: () => {
    const engine = new TextLintEngine();

    const files = [...danger.git.created_files, ...danger.git.modified_files];

    engine.executeOnFiles(files).then(results => {
      if (engine.isErrorResults(results)) {
        results.forEach(resultPerFile => {
          resultPerFile.messages.forEach(issue => {
            warn(`${issue.ruleId}: ${issue.message}`, resultPerFile.filePath, issue.line);
          });
        });
        /* tslint:disable:no-console */
        console.log(engine.formatResults(results));
      }
    });
  },
};
