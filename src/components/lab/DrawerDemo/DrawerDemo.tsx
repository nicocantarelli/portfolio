'use client';

import { useState, useCallback } from 'react';
import { Drawer } from './Drawer';
import styles from './DrawerDemo.module.css';

export function DrawerDemo() {
  const [bottomOpen, setBottomOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [nested1Open, setNested1Open] = useState(false);
  const [nested2Open, setNested2Open] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className={styles.grid}>
      {/* Bottom drawer */}
      <button className={styles.btn} onClick={() => setBottomOpen(true)}>
        <span className={styles.btnIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="15" x2="21" y2="15" />
          </svg>
        </span>
        Bottom
        <span className={styles.btnLabel}>Drag to dismiss</span>
      </button>

      {/* Side drawer */}
      <button className={styles.btn} onClick={() => setSideOpen(true)}>
        <span className={styles.btnIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="15" y1="3" x2="15" y2="21" />
          </svg>
        </span>
        Side
        <span className={styles.btnLabel}>Right panel</span>
      </button>

      {/* Nested drawers */}
      <button className={styles.btn} onClick={() => setNested1Open(true)}>
        <span className={styles.btnIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <rect x="7" y="7" width="14" height="14" rx="2" />
          </svg>
        </span>
        Nested
        <span className={styles.btnLabel}>Stacked drawers</span>
      </button>

      {/* Form drawer */}
      <button className={styles.btn} onClick={() => setFormOpen(true)}>
        <span className={styles.btnIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </span>
        Form
        <span className={styles.btnLabel}>Edit profile</span>
      </button>


      {/* --- Drawer instances --- */}

      {/* Bottom drawer */}
      <Drawer
        open={bottomOpen}
        onClose={() => setBottomOpen(false)}
        position="bottom"
        draggable
        title="Notifications"
        description="You have 3 unread messages."
      >
        <ul className={styles.navList}>
          <li className={styles.navItem}>New comment on your project</li>
          <li className={styles.navItem}>Sarah invited you to collaborate</li>
          <li className={styles.navItem}>Your deployment is live</li>
        </ul>
      </Drawer>

      {/* Side drawer */}
      <Drawer
        open={sideOpen}
        onClose={() => setSideOpen(false)}
        position="right"
        showCloseButton
        title="Menu"
      >
        <nav>
          <ul className={styles.navList}>
            {['Home', 'Projects', 'Services', 'About', 'Contact'].map((item) => (
              <li key={item} className={styles.navItem} onClick={() => setSideOpen(false)}>
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>

      {/* Nested drawer 1 */}
      <Drawer
        open={nested1Open}
        onClose={() => setNested1Open(false)}
        position="right"
        showCloseButton
        scaledDown={nested2Open}
        title="Team Member"
        description="View and manage details."
        footer={
          <>
            <button className={styles.btnGhost} onClick={() => setNested1Open(false)}>Close</button>
            <button className={styles.btnPrimary} onClick={() => setNested2Open(true)}>Edit Details</button>
          </>
        }
      >
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Name</span>
          <span className={styles.detailValue}>Nico Cantarelli</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Role</span>
          <span className={styles.detailValue}>Frontend Developer</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Email</span>
          <span className={styles.detailValue}>nico@example.com</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Location</span>
          <span className={styles.detailValue}>Argentina</span>
        </div>
      </Drawer>

      {/* Nested drawer 2 */}
      <Drawer
        open={nested2Open}
        onClose={() => setNested2Open(false)}
        position="right"
        showCloseButton
        title="Edit Details"
        description="Make changes to the member's information."
        footer={
          <>
            <button className={styles.btnGhost} onClick={() => setNested2Open(false)}>Cancel</button>
            <button className={styles.btnPrimary} onClick={() => setNested2Open(false)}>Save</button>
          </>
        }
      >
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Name</label>
          <input className={styles.formInput} defaultValue="Nico Cantarelli" type="text" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Role</label>
          <input className={styles.formInput} defaultValue="Frontend Developer" type="text" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email</label>
          <input className={styles.formInput} defaultValue="nico@example.com" type="email" />
        </div>
      </Drawer>

      {/* Form drawer */}
      <Drawer
        open={formOpen}
        onClose={() => setFormOpen(false)}
        position="right"
        showCloseButton
        title="Edit Profile"
        description="Make changes to your profile here."
        footer={
          <>
            <button className={styles.btnGhost} onClick={() => setFormOpen(false)}>Cancel</button>
            <button className={styles.btnPrimary} onClick={() => setFormOpen(false)}>Save</button>
          </>
        }
      >
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Name</label>
          <input className={styles.formInput} defaultValue="Nico Cantarelli" type="text" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Username</label>
          <input className={styles.formInput} defaultValue="@nicocantarelli" type="text" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Bio</label>
          <textarea className={styles.formTextarea} defaultValue="Frontend developer specializing in Shopify themes, WordPress, and custom web development." />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Website</label>
          <input className={styles.formInput} defaultValue="nicocantarelli.com" type="url" />
        </div>
      </Drawer>

    </div>
  );
}
