'use client';

import styles from './CSSMicroInteractions.module.css';

export function CSSMicroInteractions() {
  return (
    <div className={styles.grid}>
      {/* Pagination */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.pagination}>
            <div className={styles.paginationTrack}>
              <div className={styles.pip}>1</div>
              <div className={styles.pip}>2</div>
              <div className={styles.pip}>3</div>
              <div className={styles.pip}>4</div>
            </div>
            <div className={styles.paginationBar} />
          </div>
        </div>
        <span className={styles.cardLabel}>Pagination</span>
      </div>

      {/* Toggle Switch */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.togglePair}>
            <div className={styles.toggleTrack}>
              <div className={styles.toggleKnob} />
              <div className={styles.toggleFill} />
            </div>
            <div className={styles.toggle2}>
              <div className={styles.toggle2Bar}>
                <div className={styles.toggle2Fill} />
              </div>
              <div className={styles.toggle2Knob} />
            </div>
          </div>
        </div>
        <span className={styles.cardLabel}>Toggle</span>
      </div>

      {/* Search Box */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.searchBox}>
            <div className={styles.searchInput}>
              <span className={styles.searchCursor} />
              <span className={styles.searchPlaceholder}>Search</span>
            </div>
            <div className={styles.searchBtn}>
              <svg className={styles.searchSvg} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line className={styles.searchHandle} x1="16.65" y1="16.65" x2="21" y2="21" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
        <span className={styles.cardLabel}>Search</span>
      </div>

      {/* Radio Buttons */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.radioGroup}>
            <div className={styles.radioOption}>
              <div className={styles.radioFilled}>
                <div className={styles.radioFilledCenter} />
              </div>
              <span>Label</span>
            </div>
            <div className={styles.radioOption}>
              <div className={styles.radioRing}>
                <div className={styles.radioRingDot} />
              </div>
              <span>Label</span>
            </div>
          </div>
        </div>
        <span className={styles.cardLabel}>Radio</span>
      </div>

      {/* Hamburger Menu */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.menuPair}>
            <div className={styles.hamburger}>
              <div className={`${styles.hamLine} ${styles.hamLine1}`} />
              <div className={`${styles.hamLine} ${styles.hamLine2}`} />
              <div className={`${styles.hamLine} ${styles.hamLine3}`} />
              <svg className={styles.hamX} viewBox="0 0 20 20" fill="none" strokeWidth="3" strokeLinecap="round">
                <line x1="3" y1="3" x2="17" y2="17" className={styles.hamX1} />
                <line x1="3" y1="17" x2="17" y2="3" className={styles.hamX2} />
              </svg>
            </div>
            <div className={styles.dotsMenu}>
              <div className={`${styles.morphDot} ${styles.morphDotL}`} />
              <div className={`${styles.morphDot} ${styles.morphDotR}`} />
              <div className={`${styles.morphDot} ${styles.morphDotC}`} />
              <div className={`${styles.xArm} ${styles.xArm1}`} />
              <div className={`${styles.xArm} ${styles.xArm2}`} />
              <div className={`${styles.xArm} ${styles.xArm3}`} />
              <div className={`${styles.xArm} ${styles.xArm4}`} />
            </div>
          </div>
        </div>
        <span className={styles.cardLabel}>Menu</span>
      </div>

      {/* Loading */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.loadingPair}>
            <div className={styles.spinner}>
              <div className={styles.spoke} />
              <div className={styles.spoke} />
              <div className={styles.spoke} />
              <div className={styles.spoke} />
              <div className={styles.spoke} />
              <div className={styles.spoke} />
              <div className={styles.spoke} />
              <div className={styles.spoke} />
            </div>
          </div>
        </div>
        <span className={styles.cardLabel}>Loading</span>
      </div>

      {/* Tab Switcher */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.tabSwitcher}>
            <div className={styles.tabLabels}>
              <span className={styles.tabA}>A</span>
              <span className={styles.tabB}>B</span>
            </div>
            <div className={styles.tabLine}>
              <div className={styles.tabIndicator} />
            </div>
          </div>
        </div>
        <span className={styles.cardLabel}>Tabs</span>
      </div>

      {/* Eye (show/hide) */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <svg className={styles.eyeIcon} width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M21.8 9.8C19.8 8 16.5 6 12 6C7.5 6 4.2 8 2.2 9.8C1.4 10.4 1 11.4 1 12.4C1 13.4 1.4 14.4 2.2 15C4.2 16.7 7.5 18.8 12 18.8C16.5 18.8 19.8 16.8 21.8 15C22.6 14.4 23 13.4 23 12.4C23 11.4 22.6 10.4 21.8 9.8ZM20.5 13.5C18.8 15 15.9 16.8 12 16.8C8.1 16.8 5.2 15 3.5 13.5C3.2 13.2 3 12.8 3 12.4C3 12 3.2 11.6 3.5 11.3C5.2 9.8 8.1 8 12 8C15.9 8 18.8 9.8 20.5 11.3C20.8 11.5 21 11.9 21 12.4C21 12.8 20.8 13.2 20.5 13.5Z" className={styles.eyeShape} />
            <circle cx="12" cy="12.4" r="2.3" className={styles.eyePupil} />
            <line x1="4" y1="4" x2="20" y2="20" className={styles.eyeStrike} stroke="#757371" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className={styles.cardLabel}>Visibility</span>
      </div>

      {/* Plus to Minus */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.plusMinus}>
            <div className={styles.plusH} />
            <div className={styles.plusV} />
          </div>
        </div>
        <span className={styles.cardLabel}>Add / Remove</span>
      </div>

      {/* Sliders */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.sliders}>
            <div className={styles.sliderRow}>
              <div className={styles.sliderTrack} />
              <div className={`${styles.sliderKnob} ${styles.sliderKnob1}`} />
            </div>
            <div className={styles.sliderRow}>
              <div className={styles.sliderTrack} />
              <div className={`${styles.sliderKnob} ${styles.sliderKnob2}`} />
            </div>
            <div className={styles.sliderRow}>
              <div className={styles.sliderTrack} />
              <div className={`${styles.sliderKnob} ${styles.sliderKnob3}`} />
            </div>
          </div>
        </div>
        <span className={styles.cardLabel}>Sliders</span>
      </div>

      {/* Clock */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <svg className={styles.clockIcon} width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22ZM12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4Z" className={styles.clockFace} />
            <line x1="12" y1="12" x2="12" y2="7" className={styles.clockMinute} stroke="#757371" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="12" x2="12" y2="8" className={styles.clockHour} stroke="#757371" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span className={styles.cardLabel}>Clock</span>
      </div>

      {/* Grid */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.gridIcon}>
            <div className={styles.gridSquare} />
            <div className={styles.gridSquare} />
            <div className={styles.gridSquare} />
            <div className={styles.gridSquare} />
          </div>
        </div>
        <span className={styles.cardLabel}>Grid</span>
      </div>
      {/* Back/Forward */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.navButtons}>
            <div className={styles.navBtn}>
              <div className={styles.navArrow} />
            </div>
            <div className={`${styles.navBtn} ${styles.navBtnFwd}`}>
              <div className={styles.navArrow} />
            </div>
          </div>
        </div>
        <span className={styles.cardLabel}>Navigate</span>
      </div>

      {/* Context Menu */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.ctxMenu}>
            <div className={styles.ctxCard}>
              {/* 3 dots (visible when collapsed) */}
              <div className={styles.ctxDots}>
                <div className={styles.ctxDot} />
                <div className={styles.ctxDot} />
                <div className={styles.ctxDot} />
              </div>
              {/* X close (visible when expanded) */}
              <div className={styles.ctxClose}>
                <div className={styles.ctxCloseLine} />
                <div className={styles.ctxCloseLine} />
              </div>
              <div className={styles.ctxItems}>
                <span className={styles.ctxItem}>Edit</span>
                <span className={styles.ctxItemDanger}>Delete</span>
              </div>
            </div>
          </div>
        </div>
        <span className={styles.cardLabel}>Menu</span>
      </div>

      {/* A/B Tab Toggle */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.abToggle}>
            <div className={styles.abPill} />
            <div className={styles.abLabel}>A</div>
            <div className={styles.abLabel}>B</div>
          </div>
        </div>
        <span className={styles.cardLabel}>Tab</span>
      </div>

      {/* Icons — download + bar chart */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.iconPair}>
            <div className={styles.iconBox}>
              <div className={styles.dlInner}>
                <div className={styles.dlArrow} />
                <div className={styles.dlTray} />
              </div>
            </div>
            <div className={styles.iconBox}>
              <div className={styles.dlInner}>
                <div className={styles.barChart}>
                  <div className={styles.bar} />
                  <div className={styles.bar} />
                  <div className={styles.bar} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className={styles.cardLabel}>Icons</span>
      </div>

      {/* Pagination — circles */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.circPag}>
            <div className={`${styles.circDot} ${styles.circActive}`}><span>1</span></div>
            <div className={styles.circDot}><span>2</span></div>
            <div className={styles.circDot}><span>3</span></div>
            <div className={styles.circDot}><span>4</span></div>
          </div>
        </div>
        <span className={styles.cardLabel}>Pages</span>
      </div>

      {/* Counter */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.counter}>
            {/* Minus circle — rolls in from center */}
            <div className={styles.cCircle}>
              <div className={styles.cMinus} />
            </div>
            {/* Number display */}
            <div className={styles.cNumWrap}>
              <div className={styles.cNumScroll}>
                <div className={styles.cNum}>0</div>
                <div className={styles.cNum}>1</div>
                <div className={styles.cNum}>2</div>
              </div>
            </div>
            {/* Plus circle — rolls in from center */}
            <div className={styles.cCircle}>
              <div className={styles.cPlus} />
            </div>
          </div>
        </div>
        <span className={styles.cardLabel}>Counter</span>
      </div>

      {/* View Toggle */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.viewToggle}>
            <div className={styles.viewIcon}>
              <div className={styles.viewEl} />
              <div className={styles.viewEl} />
              <div className={styles.viewEl} />
              <div className={styles.viewEl} />
            </div>
            <div className={styles.viewTextArea}>
              <span className={styles.viewLabel}>List</span>
              <span className={styles.viewLabelAlt}>Grid</span>
            </div>
          </div>
        </div>
        <span className={styles.cardLabel}>View</span>
      </div>

      {/* Follow Button */}
      <div className={styles.card}>
        <div className={styles.cardDemo}>
          <div className={styles.followBtn}>
            <div className={styles.followShadow} />
            <div className={styles.followCircle}>
              <div className={styles.followIconTrack}>
                <svg className={styles.followCheck} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <div className={styles.followPlusWrap}>
                  <div className={styles.followPlusH} />
                  <div className={styles.followPlusV} />
                </div>
              </div>
            </div>
            <span className={styles.followText}>Follow</span>
            <span className={styles.followTextActive}>Following</span>
          </div>
        </div>
        <span className={styles.cardLabel}>Follow</span>
      </div>
    </div>
  );
}
