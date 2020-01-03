import React, { Component } from 'react';
import '../../styles/styles.scss';
import { withRouter } from 'next/router';
import Link from 'next/link';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
const CashbackFaqs = (props) => (
          <div className="fwid two-box bread-crumbs">
          <div className="fwid tabdivsec-wrap">
          <div>
          <Accordion allowZeroExpanded>
          {
              (props.faqList).map(function(faqRow){
                    return  <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                       {faqRow.faqQuestion}
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>
                        {faqRow.faqAnswer}
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>   
                
              })

          }
               
          </Accordion>
          </div>
          
                 
                  </div>
          </div>
 )

 export default CashbackFaqs;



