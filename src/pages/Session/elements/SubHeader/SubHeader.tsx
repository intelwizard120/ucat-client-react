import type { SubHeaderProps } from './SubHeader.types';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from 'features/sessions/selectors';
import { SubHeaderButton } from '../Buttons';
import { Calculator } from '../Calculator';
import { Modal } from '../Modal';
import { SessionSectionType } from '../../Session.constants';
import './_sub-header.scss';

export const SubHeader = ({ sectionType }: SubHeaderProps) => {
  const currentQuestionResponse = useSelector(selectors.selectCurrentQuestionResponse);
  const currentSection = useSelector(selectors.selectCurrentSection);

  const [isExplainModalOpen, setIsExplainModalOpen] = useState<boolean>(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState<boolean>(false);

  const handleExplainModalToggle = (isOpen: boolean) => () => setIsExplainModalOpen(isOpen);
  const handleCalculatorModalModalToggle = (isOpen: boolean) => () => setIsCalculatorModalOpen(isOpen);

  return (
    <React.Fragment>
      <div className="sub-header__container">
        <div className="sub-header__buttons">
          {sectionType === SessionSectionType.QUESTION && (
            <SubHeaderButton type="answer" onClick={handleExplainModalToggle(true)} />
          )}

          {currentSection && <SubHeaderButton type="calculator" onClick={handleCalculatorModalModalToggle(true)} />}
        </div>

        {sectionType === SessionSectionType.QUESTION && (
          <div className="sub-header__buttons">
            <SubHeaderButton type="flag" flagged={Boolean(currentQuestionResponse?.flagged)} />
          </div>
        )}
      </div>

      {isCalculatorModalOpen && (
        <Modal
          className="calculator__modal"
          title={<SubHeaderButton type="calculator" />}
          onClose={handleCalculatorModalModalToggle(false)}
        >
          <Calculator />
        </Modal>
      )}

      {isExplainModalOpen && (
        <Modal
          className="explain__modal"
          title={<SubHeaderButton type="answer" />}
          onClose={handleExplainModalToggle(false)}
        >
          <div dangerouslySetInnerHTML={{ __html: currentQuestionResponse?.question.explanation ?? '' }} />
        </Modal>
      )}
    </React.Fragment>
  );
};